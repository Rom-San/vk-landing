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
          allowfullscreen
        ></iframe>
      </div>
      <div class="container">
        <div class="title">{{ getTitle }}</div>
        <div class="content">
          <div class="text">{{ getText }}</div>
          <form class="form">
            <div class="label">Обязательные поля для заполнения</div>
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
        </div>
      </div>
      <div class="footer">
        <div class="label">Выберите мессенджер</div>
        <div class="buttons">
          <div
            class="button"
            :class="{ disabled: isButtonDisabled }"
            v-for="button in getButtons"
            :key="button.name"
          >
            <a
              class="link"
              :class="{ 'not-allowed': isButtonDisabled }"
              :href="vkLink"
            >
              <img class="logo" :src="getLogo(button.name)" alt="" />
              <div class="text">{{ getButtonText(button.name) }}</div>
            </a>
          </div>
        </div>
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
import VK from './assets/images/vk.svg';
import vkPixel from './scripts/vk-pixel';

export default {
  directives: {
    mask,
  },
  async created() {
    const href = window.location.href;
    console.log('🚀 ~ search', href);
    const params = this.getQuery(href);
    if (!params) {
      this.loader = false;
    } else {
      const uid = params.ml;
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
  data() {
    return {
      ml: null,
      loader: true,
      description: '',
      api: 'https://prosto.bz/api',
      vkUrl: 'https://vk.com/',
      youtubeUrl: 'https://www.youtube.com/embed',
      isInvalidPhone: true,
      isInvalidEmail: true,
      phone: '9991111111',
      phoneNumberLength: null,
      email: 'aaa@aaa.ru',
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
      if (link.includes('https://youtube.com')) {
        result = link.replace('watch?v=', 'embed/');
      } else {
        result = link.replace('https://youtu.be', this.youtubeUrl);
      }
      return result + '?controls=0&modestbranding=1&showinfo=0&rel=0';
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
      return this.isInvalidPhone || this.isInvalidEmail || !this.agreement;
    },
  },
  methods: {
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
      if (!this.isInvalidPhone && !this.isInvalidEmail) {
        this.getInfo();
      }
    },
    onInputEmail() {
      const pattern =
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      this.emailAttributes = pattern.test(this.email);
      this.isInvalidEmail = !this.emailAttributes;
      if (!this.isInvalidPhone && !this.isInvalidEmail) {
        this.getInfo();
      }
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
    getInfo() {
      this.postData().then((data) => {
        if (typeof data === 'string') {
          this.vkLink = `${this.vkUrl}im?sel=-${this.ml.buttons[0].botIdInSocialNetwork}&start=${data}`;
        }
      });
    },
    getLogo(name) {
      let logo;
      switch (name) {
        case 'Vkontakte':
          logo = VK;
          break;

        default:
          break;
      }
      return logo;
    },
    getButtonText(name) {
      let text;
      switch (name) {
        case 'Vkontakte':
          text = 'Вконтакте';
          break;

        default:
          break;
      }
      return text;
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
      }
    }
    .footer {
      width: 100%;
      border-top: 1px solid #687397;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 12px 0;
      .label {
        position: relative;
        top: -12px;
        padding: 5px 7px;
        background-color: #fff;
        color: #687397;
        font-size: 12px;
      }
      .buttons {
        display: flex;
        justify-content: center;
        width: 100%;
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
            padding: 5px 10px;
            &.not-allowed {
              cursor: not-allowed;
            }
            .logo {
              text-align: center;
            }
            .text {
              font-size: 14px;
              margin-bottom: 12px;
              color: #ffffff;
            }
          }
        }
      }
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
          color: #574e72;
        }
      }
      .made-in {
        margin: 12px 0;
        font-size: 12px;
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
