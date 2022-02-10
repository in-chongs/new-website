<template>
  <div class="security">
    <div class="wrapper right">
      <div class="wrapper-top">
        <img
          class="circle-img1"
          src="../../assets/accept-left-circle7.svg"
          alt=""
        />
      </div>
      <div class="row right g-container maRight">
        <div class="info">
          <div class="info__title g-font-mid">
            <span> One-stop shop for cryptos </span>
          </div>
          <div class="info__content">
            <div class="shop-tips">
              Use any major bank debit card and credit card or third-party
              payment apps to purchase cryptos. We provide fast exchange between
              fiat currencies and all popular cryptos including BTC, ETH, USDT
              and BNB Start your journey into the crypto world now.
            </div>
          </div>
          <div class="circle-img-container">
            <div class="circle-img">
              <img class="circle-visa" src="../../assets/visa.png" alt="" />
              <img
                class="circle-visa"
                src="../../assets/MasterCard.png"
                alt=""
              />
              <img class="circle-visa" src="../../assets/ApplePay.svg" alt="" />
            </div>
          </div>
          <div class="circle-img-container">
            <div class="circle-img4">
              <img src="../../assets/accept-left-circle2.svg" alt="" />
            </div>
          </div>
          <div class="circle-img-container">
            <div class="circle-img">
              <img class="circle-img5" src="../../assets/CHAHUA.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="info--img__wrapper info--img__wrapper-right container">
          <div class="wrapper-left">
            <div class="wrapper-left-item">
              <div class="select-label">You send</div>
              <div class="select-container">
                <a-input
                  placeholder="00.00"
                  :value="form.amount"
                  size="large"
                  @change="amountChange"
                >
                  <a-select
                    slot="addonAfter"
                    :value="form.from_currency"
                    @change="fromCurrencyChange"
                    class="currencySelect"
                  >
                    <a-select-option
                      v-for="item of fromCurrencyOption"
                      :value="item.value"
                      :key="item.value"
                    >
                      <img :src="item.logo" class="selectIcon" />
                      {{ item.label }}
                    </a-select-option>
                  </a-select>
                </a-input>
              </div>
            </div>
            <div class="wrapper-left-item">
              <div class="select-label">You get approximately</div>
              <div class="select-container">
                <a-input
                  placeholder="00.00"
                  :value="form.approximatelyAmount"
                  size="large"
                  disabled
                >
                  <a-select
                    slot="addonAfter"
                    :value="form.to_currency"
                    @change="toCurrencyChange"
                    size="large"
                    class="currencySelect"
                  >
                    <a-select-option
                      v-for="item of toCurrencyOption"
                      :value="item.value"
                      :key="item.value"
                    >
                      <img :src="item.logo" class="selectIcon" />
                      {{ item.label }}
                    </a-select-option>
                  </a-select>
                </a-input>
              </div>
            </div>
            <div class="wrapper-left-item">
              <div class="select-label">Wallet Address</div>
              <div class="select-container select-container-address">
                <a-input
                  placeholder="Wallet Address"
                  :value="form.address"
                  size="large"
                  @change="addressChange"
                />
                <p class="addressTips" v-if="showAddressTips">
                  Incorrect address format.Please check and try again.
                </p>
              </div>
            </div>
            <div class="wrapper-left-item">
              <a-button
                :class="goToBtnDisabled ? 'goToBtnDisabled' : 'goToBtn'"
                @click="submitGetOrder()"
                >Buy
              </a-button>
            </div>
          </div>
          <div class="circle-img-container">
            <div class="circle-img13">
              <img src="../../assets/accept-left-circle13.png" alt="" />
            </div>
            <div class="circle-img14">
              <img src="../../assets/accept-left-circle14.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <form method="post" :action="this.form.actionUrl" ref="formRef">
      <input type="hidden" name="ac_ps" value="MASTERCARD" />
      <input type="hidden" name="ac_account_email" :value="this.form.email" />
      <input type="hidden" name="ac_sci_name" :value="this.form.ac_sci_name" />
      <input
        type="hidden"
        name="ac_amount"
        :value="this.form.amount"
        className="input"
      />
      <input
        type="hidden"
        name="ac_currency"
        :value="this.form.currency"
        className="input"
      />
      <input
        type="hidden"
        name="ac_order_id"
        :value="this.form.ac_order_id"
        className="input"
      />
      <input
        type="hidden"
        name="ac_sign"
        :value="this.form.ac_sign"
        className="input"
      />
      <input
        type="hidden"
        name="ac_success_url"
        :value="this.form.url"
        :disabled="true"
      />
      <input
        type="hidden"
        name="ac_fail_url"
        :value="this.form.url"
        :disabled="true"
      />
      <input
        type="hidden"
        name="ac_status_url"
        :value="this.form.url"
        :disabled="true"
      />
    </form>
    <a-modal
      v-model="buyModelShowing"
      centered
      :footer="null"
      width="450"
      :maskClosable="false"
    >
      <iframe
        :src="form.redirect_url"
        id="iframe_moonPay"
        height="800"
        width="400"
        className="iframeStyle"
        frameBorder="0"
      >
        <p>您的浏览器暂不支持 iframe 标签。</p>
      </iframe>
    </a-modal>
    <a-modal
      v-model="buyModelIframeMer"
      centered
      :footer="null"
      :forceRender="true"
      width="450"
      :maskClosable="false"
    >
      <div id="mercuryo-widget" style="width: 400px; height: 800px" />
    </a-modal>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js';
// eslint-disable-next-line import/extensions
import { RegCoin } from '@/utils/reg.js';
import { authBefore, authAfter } from '@/utils/config';
// eslint-disable-next-line import/extensions
import { getRates, buyCurrency } from '@/utils/api.js';
// eslint-disable-next-line import/extensions
import { fromCurrencyOption, toCurrencyOption } from '@/utils/coinImg.js';

export default {
  name: 'QuickBuy',
  data() {
    return {
      form: {
        amount: '100.00',
        approximatelyAmount: '',
        from_currency: 'USD',
        to_currency: 'BTC',
        address: '',
        channel_name: '',
        url: window.location.href,
        actionUrl: 'https://wallet.advcash.com/sci/',
        email: '',
        ac_sci_name: '',
        currency: '',
        ac_order_id: '',
        ac_sign: '',
        redirect_url: '',
      },
      getSignSuccess: false,
      showAddressTips: false,
      buyModelShowing: false,
      buyModelIframeMer: false,
      goToBtnDisabled: true,
      relbigNumber: new BigNumber(),
      rate: '',
      channer_name: '',
      toCurrencyOption: [],
      fromCurrencyOption: [],
    };
  },
  created() {
    this.initRate();
    this.fromCurrencyOption = fromCurrencyOption;
    this.toCurrencyOption = toCurrencyOption;
  },
  methods: {
    getParams(url) {
      const params = {};
      const search = `?${url.split('?')[1]}`;
      if (search.indexOf('?') === 0 && search.indexOf('=') > 1) {
        const paramArray = unescape(search)
          .substring(1, search.length)
          .split('&');
        if (paramArray.length > 0) {
          paramArray.forEach((currentValue) => {
            // eslint-disable-next-line prefer-destructuring
            params[currentValue.split('=')[0]] = currentValue.split('=')[1];
          });
        }
      }
      return params;
    },
    initRate() {
      const params = {
        authorization: `${authBefore}${Date.now()}${authAfter}`,
        from_currency: this.form.from_currency,
        to_crypto: this.form.to_currency,
      };
      this.form.approximatelyAmount = '00.00';
      getRates(params)
        .then((response) => {
          this.loading = false;
          const res = response.data;
          if (res.code === 0) {
            if (res.result.rates) {
              let indexOfMax = 0;
              res.result.rates.reduce(
                // eslint-disable-next-line no-return-assign
                (a, c, i) => (c.priority > a ? ((indexOfMax = i), c.priority) : a),
                0,
              );
              this.rate = res.result.rates[indexOfMax].rate;
              this.channel_name = res.result.rates[indexOfMax].channel_name;
              this.form.approximatelyAmount = this.form.amount
                ? `～ ${BigNumber(this.form.amount)
                  .dividedBy(BigNumber(res.result.rates[indexOfMax].rate))
                  .toFixed(4)}`
                : '～';
            } else {
              this.$message.error('currency not support');
            }
          } else {
            this.$message.error(`${res.msg}`);
          }
        })
        .catch((err) => {
          this.$message.error(`${err}`);
          this.loading = false;
        });
    },
    amountChange(value) {
      this.form.amount = value.target.value;
      this.form.approximatelyAmount = value.target.value
        ? `～ ${BigNumber(value.target.value)
          .dividedBy(BigNumber(this.rate))
          .toFixed(4)}`
        : '～';
    },
    fromCurrencyChange(value) {
      this.form.from_currency = value;
      this.initRate();
    },
    toCurrencyChange(value) {
      this.form.to_currency = value;
      if (
        RegCoin[this.form.to_currency].test(this.form.address)
        || !this.form.address
      ) {
        this.showAddressTips = false;
        this.goToBtnDisabled = false;
      } else {
        this.showAddressTips = true;
        this.goToBtnDisabled = true;
      }
      this.initRate();
    },
    addressChange(value) {
      this.form.address = value.target.value;
      if (
        RegCoin[this.form.to_currency].test(value.target.value)
        || !value.target.value
      ) {
        this.showAddressTips = false;
        this.goToBtnDisabled = false;
      } else {
        this.showAddressTips = true;
        this.goToBtnDisabled = true;
      }
    },
    async submitGetOrder() {
      if (this.goToBtnDisabled === true) {
        //
      } else if (!this.form.address) {
        this.$message.error('Please enter Wallet Address');
      } else if (!this.form.amount) {
        this.$message.error('Please enter amount');
      } else {
        this.goToBtnDisabled = true;
        const param = {
          authorization: `${authBefore}${Date.now()}${authAfter}`,
          cust_order_id: Date.now(),
          from_currency: this.form.from_currency,
          amount: BigNumber(this.form.amount).toFixed(2),
          to_crypto: this.form.to_currency,
          channel_name: this.channel_name,
          address: this.form.address,
          return_url: window.location.href,
        };
        await buyCurrency(param)
          .then((response) => {
            const res = response.data;
            this.goToBtnDisabled = false;
            if (res.code === 0) {
              if (res.result.data.channel_name === 'advcash') {
                this.form.amount = res.result.amount;
                this.form.currency = res.result.currency;
                this.form.email = res.result.data.email;
                this.form.ac_sci_name = res.result.data.sci_name;
                this.form.order_id = res.result.order_id;
                this.form.signature = res.result.data.signature;
                this.getSignSuccess = true;
              } else if (res.result.data.channel_name === 'mercuryo') {
                const params = this.getParams(res.result?.data?.redirect_url);
                this.buyModelIframeMer = true;
                window.mercuryoWidget.run({
                  widgetId: params.widget_id,
                  host: document.getElementById('mercuryo-widget'),
                  address: params.address,
                  type: params.type,
                  currency: params.currency,
                  fixCurrency: params.fix_currency,
                  fixAmount: params.fix_amount,
                  fiatCurrency: params.fiat_currency,
                  fixFiatCurrency: params.fix_fiat_currency,
                  fiatAmount: params.fiat_amount,
                  fixFiatAmount: params.fix_fiat_amount,
                  merchantTransactionId: params.merchant_transaction_id,
                  signature: params.signature,
                });
              } else if (res.result.data.channel_name === 'moonpay') {
                this.form.redirect_url = res.result.data.redirect_url;
                this.buyModelShowing = true;
              } else {
                window.location.href = res.result.data.redirect_url;
              }
            } else {
              this.$message.error(`${res.msg}`);
            }
          })
          .catch((err) => {
            this.goToBtnDisabled = false;
            this.$message.error(`${err.response.data.msg}`);
          });
        if (this.getSignSuccess && this.form.channel_name === 'advcash') {
          this.$refs.formRef.submit();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.security {
  text-align: center;
  padding-top: 40px;
}
.wrapper-top {
  max-width: 1080px;
  margin: auto;
  text-align: left;
}
.tip {
  font-size: 16px;
  line-height: 28px;
  color: var(--color-content);
}

.title {
  margin-top: 10px;
}

.top {
  margin-top: 100px;
  padding-bottom: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 30px;
  justify-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-row-gap: 40px;
  }
}

.info {
  text-align: left;
}

.circle-img-container {
  display: flex;
  flex: 1;
  margin-bottom: 20px;
  @media (max-width: 960px) {
    margin-bottom: 0;
  }
}

.circle-img1 {
  max-width: 120px;
}

.circle-img2 {
  width: 25%;
  margin-left: 65%;
  max-width: 120px;
}
.circle-img4 {
  flex: 1;
  text-align: end;
}
.circle-img {
  flex: 1;
  margin-top: 40px;
}
.circle-img13 {
  flex: 1;
  margin-top: 120px;
  text-align: left;
}
.circle-img14 {
  flex: 1;
  margin-top: 40px;
  text-align: right;
}
.shop-tips {
  font-size: 18px;
  font-weight: 400;
  opacity: 0.4;
}
.circle-visa {
  height: 32px;
  margin-right: 20px;
}
.info__title {
  font-size: 60px;
  line-height: 70px;
  font-family: SamsungSharpSans-Bold;
  @media (max-width: 960px) {
    margin-top: 20px;
    font-size: 30px;
    line-height: 35px;
  }
}

.info__content {
  margin-top: 30px;
  color: #546175;
  font-size: 18px;
  line-height: 28px;
}

.info--img__wrapper {
  position: relative;
}

.info--img {
  max-width: 100%;
}

.wrapper {
  &.right {
    padding-bottom: 100px;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: right top;
    &.wrapper-phone {
      @media (max-width: 960px) {
        padding-bottom: 0;
      }
    }
  }

  &.left {
    padding-bottom: 200px;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: left top;
    @media (max-width: 960px) {
      background: none;
    }
  }
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  align-items: center;

  & > *:nth-child(2) {
    justify-self: right;
  }

  @media (max-width: 960px) {
    display: inline-block;
    grid-template-columns: 1fr;
    justify-items: center;
    grid-row-gap: 100px;
    & > *:nth-child(2) {
      justify-self: center;
    }
    &.right {
      & > *:nth-child(1) {
        grid-row: 1;
      }
      & > *:nth-child(2) {
        grid-row: 2;
      }
    }
    .circle-img5 {
      max-width: calc(100%);
    }
  }
}
// .maRight {
//   @media (max-width: 960px) {
//     padding: 0;
//   }
// }
.wrapper-left {
  // width: 380px;
  max-width: calc(100%);
  height: 420px;
  margin-top: 30px;
  padding: 20px;
  background: var(--background-common);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.wrapper-left-item {
  margin-bottom: 20px;
}
.select-container-address {
  height: 50px;
}
.currencySelect {
  min-width: 160px;
}
.select-label {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  text-align: left;
  font-weight: bold;
  opacity: 0.3;
}
.selectIcon {
  height: 20px;
  width: 20px;
  margin-right: 10px;
  margin-top: -3px;
}
.addressTips {
  color: #c91919;
  font-size: 12px;
  margin-top: 10px;
  text-align: left;
}
.goToBtn {
  background: #0045ff;
  border-radius: 8px;
  height: 40px;
  width: 100%;
  color: #fff;
  margin-top: 20px;
}
.goToBtnDisabled {
  background: #80a2ff;
  border-radius: 8px;
  height: 40px;
  width: 100%;
  color: #fff;
  margin-top: 20px;
}
</style>
