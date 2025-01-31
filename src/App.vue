<template>
  <div class="wrapper" v-if="!loader && ml" :style="previewStyle">
    <div
      class="minilanding"
      :class="{ wide: ml?.content?.pageFormat === 'fullscreen' }"
    >
      <div class="headline" v-if="ml?.content?.pageFormat !== 'fullscreen'">
        <img v-if="ml.content.image" class="image" :src="getImage" alt="" />
        <iframe
          v-if="ml.content.video && !isVkVideo"
          class="video"
          width="585"
          :src="getVideo"
          frameborder="0"
          allow="autoplay; encrypted-media; fullscreen;"
        ></iframe>
        <div class="vk-video" v-if="isVkVideo" v-html="vkVideoFrame"></div>
      </div>
      <div class="container">
        <div class="title" :style="titleStyle">{{ getTitle }}</div>
        <div class="content">
          <div class="text" :style="textStyle">{{ getText }}</div>
          <form class="form">
            <div
              v-if="
                ml &&
                (ml.additionalOptions.showPhone ||
                  ml.additionalOptions.showEmail)
              "
              class="label"
              :style="textStyle"
            >
              Обязательные поля для заполнения
            </div>
            <div
              v-if="ml && ml.additionalOptions.showPhone"
              class="input-block"
              :class="{ invalid: isInvalidPhone }"
            >
              <img class="icon" :src="getPhoneIcon" alt="" />
              <input
                v-mask="'+7(###) ###-##-##'"
                type="tel"
                v-model="phone"
                @click="onClickPhone"
                @input="onInputPhone"
                @change="onChangePhone"
                placeholder="Ведите Ваш номер телефона"
                :style="textStyle"
              />
            </div>
            <div
              v-if="ml && ml.additionalOptions.showEmail"
              class="input-block"
              :class="{ invalid: isInvalidEmail }"
            >
              <img class="icon" :src="getEmailIcon" alt="" />
              <input
                type="email"
                v-model="email"
                @input="onInputEmail"
                @change="onChangeEmail"
                placeholder="Ведите Ваш емейл"
                :style="textStyle"
              />
            </div>
          </form>
          <div class="buttons">
            <div
              class="button"
              :class="{ disabled: isButtonDisabled }"
              v-for="button in getButtons"
              :key="button.name"
            >
              <div
                class="link"
                @click="onButton"
                :class="{ 'not-allowed': isButtonDisabled }"
              >
                <div class="text">Подписаться</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div
          class="agreement"
          :class="{ 'not-agreement': !agreement }"
          :style="textStyle"
        >
          <input name="agreement" type="checkbox" v-model="agreement" />
          <label for="agreement" :style="textStyle">
            Вы соглашаетесь с&nbsp;
            <a href="https://prostolp.com/policy.pdf" target="_blank">
              Условиями использования и Политикой конфиденциальности</a
            >
          </label>
        </div>
        <div class="made-in" :style="textStyle">
          Сделано на платформе
          <a href="http://prosto.bz" target="_blank">prosto.bz</a>
        </div>
      </div>
    </div>
  </div>
  <div v-if="loader" id="preloader">
    <div id="loader"></div>
  </div>
  <div v-if="!loader && !ml" class="empty">
    <div class="text">Нет данных</div>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';
import PhoneIcon from './assets/images/phone.svg';
import EmailIcon from './assets/images/mail.svg';
import bridge from '@vkontakte/vk-bridge';
import VKpixel from './scripts/vk-pixel';
import qs from 'query-string';
import VKApi from './scripts/vk-api';

export default {
  directives: {
    mask,
  },
  async created() {
    this.hash = qs.parse(location.hash);
    this.search = qs.parse(location.search);
    this.vkUserInfo = bridge.send('VKWebAppGetUserInfo');
    this.api = this.hash.stage
      ? this.getApiFromStage(this.hash.stage)
      : 'https://prosto.bz/api';
    if (!this.hash?.ml) {
      const id = this.hash.group;
      this.enterUser(id);
    } else {
      const uid = this.hash.ml;
      try {
        const response = await fetch(`${this.api}/mini-landing/${uid}`);
        this.ml = await response.json();
        this.loader = false;
        document.title = this.ml.content.title;
        this.groupId = parseInt(this.ml.buttons[0].botIdInSocialNetwork);
        this.setDescription();
        VKApi(this.vkApiId);
        if (this.ml?.additionalOptions.VkPixel) {
          VKpixel(this.ml.additionalOptions.VkPixel);
        }
      } catch (error) {
        this.ml = null;
        this.loader = false;
        console.log(error.message);
      }
    }
  },
  async mounted() {
    if (bridge.supports('VKWebAppResizeWindow')) {
      setTimeout(() => {
        const offsetHeight = document.body.offsetHeight;
        const appHeight = offsetHeight < 8050 ? offsetHeight : 8050;
        bridge.send('VKWebAppResizeWindow', { height: appHeight });
      }, 1000);
    }
  },
  data() {
    return {
      search: null,
      ml: null,
      hash: null,
      loader: true,
      description: '',
      groupId: null,
      vkApiId: 7831726,
      api: null,
      vkUrl: 'https://vk.com/',
      vkUserInfo: {},
      vkAuth: {},
      vkApi: 'https://api.vk.com/method/',
      youtubeUrl: 'https://www.youtube.com/embed',
      vkVideoUrl: 'https://vk.com/video_ext.php?oid=',
      isInvalidPhone: true,
      isInvalidEmail: true,
      phone: null,
      phoneNumberLength: null,
      email: null,
      emailAttributes: false,
      vkLink: '',
      agreement: true,
      isVkVideo: false,
      vkVideoFrame: '',
      vkVideoHash: null,
    };
  },
  watch: {
    async groupId(val) {
      console.log(val);
      /*       this.vkAuth = await bridge.send('VKWebAppGetAuthToken', {
        app_id: this.vkApiId,
        scope: '',
      }); 
      console.log('🚀 ~ mounted ~ this.vkAuth', this.vkAuth);
      const link = this.ml.content.video;
      if (link.includes('https://vk.com') && this.vkAuth.access_token) {
        const pattern = /(?!video)[\d-]+/g;
        const ids = link.match(pattern);
        const params = {
          owner_id: ids[0],
          videos: ids[1],
          access_token: this.search.access_token,
          v: 5.131,
        };
        VK.Auth.login();
        VK.Api.call('video.get', params, (r) => {
          console.log('🚀 ~ videos ~ response', r);
          this.vkVideoSrc = r.items[0].player;
        });
      }*/
    },
  },
  computed: {
    previewStyle() {
      return this.ml?.content?.pageFormat === 'fullscreen'
        ? this.ml?.content?.image
          ? `background-image: url('${this.api}/file/${this.ml.content.image[0]}')`
          : `background: ${this.ml.content.backgroundColor}`
        : `background: ${this.ml.content.backgroundColor}`;
    },
    titleStyle() {
      return this.ml?.content?.titleColor
        ? `color: ${this.ml.content.titleColor}`
        : 'color: #686FB0';
    },
    textStyle() {
      return this.ml?.content?.textColor
        ? `color: ${this.ml.content.textColor}`
        : 'color: #574E72';
    },
    getImage() {
      return this.ml.content
        ? `${this.api}/file/${this.ml.content.image[0]}`
        : '';
    },
    getVideo() {
      let result;
      const link = this.ml.content.video;
      const ytExt = '?controls=0&modestbranding=1&showinfo=0&rel=0';
      if (link.includes('https://youtube.com')) {
        result = link.replace('watch?v=', 'embed/') + ytExt;
      }
      if (link.includes('https://youtu.be')) {
        result = link.replace('https://youtu.be', this.youtubeUrl) + ytExt;
      }
      if (link.includes('https://vk.com') && this.vkVideoSrc) {
        this.isVkVideo = true;
        /*         const width = 'width="630"';
        const height = 'height="356"';
        const wPattern = /width="[\d]+"/gm;
        const hPattern = /height="[\d]+"/gm;
        frame = link.replace(wPattern, width);
        frame = frame.replace(hPattern, height); */
        result = link;
      }
      return result;
    },
    getTitle() {
      return this.ml?.content ? this.ml.content.title : '';
    },
    getText() {
      return this.ml?.content ? this.ml.content.text : '';
    },
    getPhoneIcon() {
      return PhoneIcon;
    },
    getEmailIcon() {
      return EmailIcon;
    },
    getButtons() {
      return this.ml?.buttons?.length ? this.ml.buttons : [];
    },
    isButtonDisabled() {
      return (
        (this.isInvalidPhone && this.ml.additionalOptions.showPhone) ||
        (this.isInvalidEmail && this.ml.additionalOptions.showEmail) ||
        !this.agreement
      );
    },
  },
  methods: {
    getApiFromStage(stage) {
      let apiUrl = null;
      switch (stage) {
        case '1':
          apiUrl = 'https://develop.dev.prosto.bz/api';
          break;
        case '2':
          apiUrl = 'http://localhost:3000/api';
          break;
        default:
          break;
      }
      return apiUrl;
    },
    sendClick() {
      const url = `${this.api}/mini-landing/${this.hash.ml}/vk`;
      fetch(url, { method: 'PATCH' });
    },
    async onButton() {
      if (!this.isButtonDisabled) {
        this.sendClick();
        await this.postData();
        const id = this.ml.buttons[0].botIdInSocialNetwork;
        this.enterUser(id);
      }
    },
    async enterUser(id) {
      try {
        await fetch(`${this.api}/vk-user-enter`, {
          method: 'post',
          body: JSON.stringify({
            ...this.vkUserInfo,
            ...this.search,
            ...this.hash,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.log('Ошибка:', error);
      }
      this.vkLink = `${this.vkUrl}im?sel=-${id}`;
      window.top.location.href = this.vkLink;
    },
    getQuery(href) {
      let result = {};
      if (href.includes('#')) {
        const ext = href.split('#');
        const arr = ext[1].split('&');
        arr.forEach((item) => {
          const param = item.split('=');
          Object.assign(result, { [param[0]]: param[1] });
        });
      } else {
        this.loader = false;
        result = null;
      }
      return result;
    },
    setDescription() {
      const index = this.ml.content.text.indexOf('.');
      this.description = this.ml.content.text.slice(0, index + 1);
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      meta.content = this.description;
      document.head.appendChild(meta);
    },
    onChangePhone() {
      if (this.phoneNumberLength < 11) this.isInvalidPhone = true;
    },
    onChangeEmail() {
      if (this.emailAttributes) {
        this.isInvalidEmail = false;
      } else {
        this.isInvalidEmail = true;
      }
    },
    onClickPhone() {
      if (!this.phone) this.phone = '+7';
    },
    onInputPhone() {
      const clearPhone = this.phone.replace(/[^\d]/g, '');
      this.phoneNumberLength = clearPhone.length;
      this.isInvalidPhone = this.phoneNumberLength < 11;
    },
    onInputEmail() {
      const pattern =
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      this.emailAttributes = pattern.test(this.email);
      this.isInvalidEmail = !this.emailAttributes;
    },
    async postData() {
      const data = {
        id: this.ml.buttons[0].commandId,
        fields: {
          email: this.email,
          phone: this.phone,
        },
        tags: this.ml.buttons[0].tags,
      };
      try {
        const response = await fetch(`${this.api}/info`, {
          method: 'POST',
          body: JSON.stringify(data),
        });
        return response.text();
      } catch (error) {
        console.log(error.message);
      }
    },
    async allowMessages() {
      try {
        const allowMessages = await bridge.send(
          'VKWebAppAllowMessagesFromGroup',
          {
            group_id: this.groupId,
          }
        );
        console.log('🚀 ~ allowMessages', allowMessages);
        return allowMessages;
      } catch (e) {
        console.log('🚀 ~ allowMessages ~ e', e);
        return await this.allowMessages();
      }
    },
  },
};
</script>

<style lang="scss">
@import './assets/styles/main.scss';
@import './assets/styles/loader.scss';
.wrapper {
  box-sizing: border-box;
  color: #333;
  background-color: #edeef0;
  width: 100%;
  padding: 24px 0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  .minilanding {
    color: #000;
    background-color: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    max-width: 585px;
    box-sizing: border-box;
    margin: auto;
    &.wide {
      width: 407px;
      background: hsla(0, 0%, 0%, 0.3);
    }
    .headline {
      overflow: hidden;
      display: flex;
      .image {
        width: 100%;
      }
      .video {
        width: 630px;
        height: 356px;
        overflow: hidden;
      }
      .vk-video {
        width: 630px;
        height: 356px;
        overflow: hidden;
      }
    }
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 22px;
      .title {
        font-weight: 400;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
      }
      .content {
        width: 100%;
        text-align: center;
        margin-top: 25px;
        font-weight: 400;
        font-size: 16px;
        .text {
          text-align: start;
          white-space: pre-wrap;
          line-height: 22px;
        }
        .form {
          margin-top: 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .label {
            font-size: 13px;
            font-weight: bold;
          }
          .input-block {
            display: flex;
            border: 1px solid #b3cce2;
            border-radius: 6px;
            overflow: hidden;
            min-width: 250px;
            margin: 5px 0;
            &.invalid {
              border: 1px solid #ff0000;
            }
            .icon {
              padding: 0 7px;
            }
            input {
              border: none;
              padding: 8px;
              color: #769dc0;
              outline: none;
              font-size: 13px;
              width: 100%;
              background-color: rgba(0, 0, 0, 0);
              &::placeholder {
                color: #41a8f2;
              }
            }
          }
        }
        .buttons {
          display: flex;
          justify-content: center;
          width: 100%;
          margin: 12px 0;
          .button {
            background: #0077ff;
            border-radius: 16px;
            &.disabled {
              opacity: 0.5;
            }
            .link {
              text-decoration: none;
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 10px;
              cursor: pointer;
              &.not-allowed {
                cursor: not-allowed;
              }
              .logo {
                text-align: center;
              }
              .text {
                font-size: 14px;
                color: #ffffff;
              }
            }
          }
        }
      }
    }
    .footer {
      display: flex;
      border-top: 1px solid #b3cce2;
      flex-direction: column;
      align-items: center;
      padding: 12px 0;
      .agreement {
        display: flex;
        justify-content: center;
        margin: 12px 0;
        font-size: 12px;
        &.not-agreement {
          color: #ff0000;
        }
        input {
          margin: 0 12px;
        }
        a {
          color: #769dc0;
        }
      }
      .made-in {
        margin: 12px 0;
        font-size: 12px;
        a {
          color: #769dc0;
        }
      }
    }
  }
}
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 100vh;
  .text {
    color: #574e72;
  }
}
</style>
