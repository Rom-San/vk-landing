<template>
  <div class="wrapper" v-if="!loader && ml">
    <div class="minilanding">
      <div class="headline">
        <img v-if="ml.content.image" class="image" :src="getImage" alt="" />
        <iframe
          v-if="ml.content.video"
          class="video"
          width="585"
          :src="getVideo"
          frameborder="0"
          allow="autoplay; encrypted-media; fullscreen;"
        ></iframe>
      </div>
      <div class="container">
        <div class="title">{{ getTitle }}</div>
        <div class="content">
          <div class="text">{{ getText }}</div>
          <form class="form">
            <div
              v-if="
                ml &&
                (ml.additionalOptions.showPhone ||
                  ml.additionalOptions.showEmail)
              "
              class="label"
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
        <div class="agreement" :class="{ 'not-agreement': !agreement }">
          <input type="checkbox" v-model="agreement" />
          Вы соглашаетесь с&nbsp;
          <a href="https://prostolp.com/policy.pdf" target="_blank">
            Условиями использования и Политикой конфиденциальности</a
          >
        </div>
        <div class="made-in">
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
import vkPixel from './scripts/vk-pixel';

export default {
  directives: {
    mask,
  },
  async created() {
    const href = window.location.href;
    console.log('🚀 ~ search', window.location);
    this.params = this.getQuery(href);
    if (!this.params) {
      this.loader = false;
    } else {
      const uid = this.params.ml;
      this.hash = this.params.hash;
      try {
        const response = await fetch(`${this.api}/mini-landing/${uid}`);
        this.ml = await response.json();
        this.loader = false;
        document.title = this.ml.content.title;
        this.setDescription();
        if (this.ml?.additionalOptions.VkPixel) {
          vkPixel(this.ml.additionalOptions.VkPixel);
        }
        vkPixel();
      } catch (error) {
        this.ml = null;
        this.loader = false;
        console.log(error.message);
      }
    }
  },
  mounted() {
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
      params: null,
      ml: null,
      hash: null,
      loader: true,
      description: '',
      api: 'https://prosto.bz/api',
      vkUrl: 'https://vk.com/',
      youtubeUrl: 'https://www.youtube.com/embed',
      vkUserEnter: 'https://prosto.bz/ws/vk-user-enter',
      vkVideoUrl: 'https://vk.com/video_ext.php?oid=',
      isInvalidPhone: true,
      isInvalidEmail: true,
      phone: null,
      phoneNumberLength: null,
      email: null,
      emailAttributes: false,
      vkLink: '',
      agreement: true,
    };
  },
  computed: {
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
      if (link.includes('https://vk.com')) {
        const vkExt = link.replace('https://vk.com/video', '').split('_');
        result = `${this.vkVideoUrl}${vkExt[0]}&id=${vkExt[1]}&hash=1b4beb5bfd0602dd`;
      }
      console.log('🚀 ~ getVideo ~ result', result);
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
    async onButton() {
      if (!this.isButtonDisabled) {
        try {
          await this.postData();
          const allowMessages = await this.allowMessages();
          console.log('🚀 allowMessages', allowMessages);
          const res = await bridge.send('VKWebAppGetUserInfo');
          await fetch(this.vkUserEnter, {
            method: 'post',
            body: JSON.stringify({ ...res, ...this.params }),
            headers: { 'Content-Type': 'application/json' },
          });
          console.log('🚀 ~ onButton ~ this.vkLink', this.vkLink);
        } catch (error) {
          console.log('Ошибка:', error);
        }
        this.vkLink = `${this.vkUrl}im?sel=-${this.ml.buttons[0].botIdInSocialNetwork}`;
        window.top.location.href = this.vkLink;
      }
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
        const groupId = parseInt(this.ml.buttons[0].botIdInSocialNetwork);
        console.log('🚀 ~ groupId', groupId);
        const allowMessages = await bridge.send(
          'VKWebAppAllowMessagesFromGroup',
          {
            group_id: groupId,
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
  font-size: 16px;
  line-height: 1;
  color: #333;
  background-color: #edeef0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .minilanding {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    color: #000;
    border-radius: 16px;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    .headline {
      overflow: hidden;
      display: flex;
      max-height: 300px;
      .image {
        width: 100%;
        -o-object-fit: cover;
        object-fit: cover;
      }
      .video {
        height: 300px;
        width: 530px;
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
      width: 100%;
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
