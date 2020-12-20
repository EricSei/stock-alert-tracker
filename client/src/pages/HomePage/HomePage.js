import React from "react";
import Layout from "../../components/Layout/Layout";
import Footer from "../Footer/Footer";
import "./Homepage.scss";

const Home = () => {
  return (
    <Layout>
      <div className="header_banner_area">
        <div className="banner_header">
          <h2 className="banner_head_text">
            Zaw Financial
            <br /> Solutions
          </h2>
          <p className="banner_head_text_p">
            Financial Education and Consulting with Experience
          </p>
        </div>
      </div>
      {/* header banner area end */}
      <div className="homepage_banner_container">
        <div className="home_banner_row">
          {/* content banner area start */}
          <div className="content_banner_area">
            <div className="ui vertical fluid segment">
              <div className="ui middle aligned stackable grid container">
                <div className="row section_ara_banner">
                  <div className="eight wide column">
                    <h2 className="ui header header_heading">
                      Zaw Financial Solutions (ZFS)
                    </h2>
                    <p>
                      ဇော်တူးဆိုင်း ဦးဆောင်ဖွဲ့စည်းထားသည့် နယူးယောက်မြို့
                      အခြေစိုက် Zaw Financial Solutions (ZFS – ‘ဇီ အက်ဖ် စက်’
                      လို့ အတို ခေါ်ပါသည်။) ကို မတ်လ (၂၀၂၀) မှာ တရားဝင်
                      စတင်ခဲ့ပါတယ်။ ဇော်တူးဆိုင်းသည် နယူးယောက်မြို့ရဲ့ အထင်ကရ
                      ကိုလ်လန်ဘီယာ (Columbia University) တက္ကသိုလ်ကနေ ဘောဂဗေဒ
                      မူဝါဒ ရေးရာဆိုင်ရာ မဟာဘွဲ့ကို (၂၀၁၅) မှာ ရရှိခဲ့ပြီ:
                      သဌေးကြီးဂျော့ဆီုးရီုးစ် ရဲ့ ဖောင်ဒေးရှင်းမှာ (၁၅) နှစ်ကြာ
                      တာဝန်ထမ်းဆောင်ခဲ့ပါတယ်။ ZFS အဖွဲ့သားများသည်
                      အ​မေရိကန်နိုင်ငံတွင် စတော့ရှယ်ယာများကို လက်လီအားဖြင့်
                      ရေတိုရေရှည် ရင်းနှီးမြှုပ်နှံခြင်းနှင့် စျေးကွက်
                      အတက်အကျအပေါ်မူတည်၍ အရောင်းအဝယ်များ ပြုလုပ်ခြင်း စသည့်
                      အတွေ့အကြုံများကို (၁၀) နှစ်ကျော်မျှ ရရှိနေကြသူများ
                      ဖြစ်ပြီး၊ ရွှေ၊ ရေနံ၊ အမေရိကန်အစိုးရ၏
                      အတိုးနှုံးစာချုပ်များ (Bonds) နှင့် အခြား
                      ငွေကြေးနှင့်ဆက်နွယ်မှုရှိသည့် ကုန်စည်များကို
                      အင်တာနက်မှတဆင့် ကြိုရောင်း ကြိုဝယ်စနစ် (Futures) ဖြင့်
                      အပတ်စဉ် သို့မဟုတ် လစဉ် ဝင်ငွေအဖြစ် အရောင်းအဝယ်
                      လုပ်နေကြသည်မှာလည်း (၃) နှစ်ကျော် အတွေအကြုံ ရရှိထားကြသူများ
                      ဖြစ်ကြပါသည်
                    </p>

                    <div className="button_area">
                      <div className="btn_button">
                        <a className="btn_area" href="#">
                          အမည်စာရင်း ပေးသွင်းရန်
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="six wide right floated column image_frame">
                    <img
                      src="https://cdn.thinkific.com/7/20190201/b90c12dd137ff6b9a95c5e3bf24c585e.png"
                      className="ui large bordered rounded image"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="second_bannerarea">
              <h2 className="second_banner_header"> Solutions at ZFS</h2>
              <div className="text-icon__container text-icon__container___7c5c9">
                <ul className="text-icon__list section__body">
                  <li className="text-icon__list-item">
                    <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                    <h3>ငွေကြေးဆိုင်ရာပညာပေး (Financial Education)</h3>
                    <p>
                      ZFS က စတော့ရှယ်ယာ နှင့် ငွေကြေးဆိုင်ရာ ကိစ္စရပ်များကို
                      မြန်မာပြည်သားများအား ပညာပေးလိုသည့် ဆန္ဒဖြင့်
                      ဖွဲ့စည်းထားခြင်းဖြစ်ပြီ: အခမဲ့ ဆွေးနွေးပွဲတွေ အင်တာနက်မှာ
                      ကျင်းပ ပေးပါမည်။ စတော့ရှယ်ယာ စျေးကွက်တွေကို ရေရှည်
                      (Professional) ပရော်ဖင်ရှင်နယ် အဖြစ်နှင့် စီးပွားရေး
                      ဆန်ဆန် လုပ်ပြီး အသက်မွေးမှု လုပ်ငန်းလို ဝင်ငွေရှာချင်ပြီး
                      ဂဃနဏ လေ့လာချင်ရင်တော့ အခဲ့ကြေးငွေယူ သင်ကြားပေးမည်
                      ဖြစ်ပါသည်။
                    </p>
                  </li>

                  <li className="text-icon__list-item">
                    <i className="fa fa-chart-line" aria-hidden="true"></i>
                    <h3>Real Time Consulting</h3>
                    <p>
                      အချိန်နှင့် တပြေးညီ ကြိုရောင်း ကြိုဝယ်စနစ် (Futures)
                      စျေးကွက်မှာ ဇော်တူးဆိုင်း အရောင်းအဝယ် လုပ်နေတာကို
                      ကြည့်ပြီး အသင်မိတ်တွေတို့ပါ လေ့လာ သင်ယူ
                      လုပ်ဆောင်နိုင်ပါသည်။ စတော့ရှယ်ယာ စျေးကွက်တွေ တက်တက် ကျကျ
                      ငွေရှာလို့ရတဲ့ ဖြစ်နိုင်ခြေ အလားအလာများတဲ့
                      ဝယ်လို/ရောင်းလိုအား နည်းလမ်းတွေ သုံးသွားမည် ဖြစ်ပါသည်။
                    </p>
                  </li>

                  <li class="text-icon__list-item">
                    <i class="fa fa-location-arrow" aria-hidden="true"></i>
                    <h3> အတွေအကြုံ (Experience)</h3>
                    <p>
                      ZFS အဖွဲ့သားများသည် အ&#8203;မေရိကန်နိုင်ငံတွင်
                      စတော့ရှယ်ယာများကို လက်လီအားဖြင့် ရေတိုရေရှည်
                      ရင်းနှီးမြှုပ်နှံခြင်းနှင့် စျေးကွက် အတက်အကျအပေါ်မူတည်၍
                      အရောင်းအဝယ်များ ပြုလုပ်ခြင်း စသည့် အတွေ့အကြုံများကို (၁၀)
                      နှစ်ကျော်မျှ ရရှိနေကြသူများ ဖြစ်ပြီး၊ ရွှေ၊ ရေနံ၊
                      အမေရိကန်အစိုးရ၏ အတိုးနှုံးစာချုပ်များ (Bonds) နှင့် အခြား
                      ငွေကြေးနှင့်ဆက်နွယ်မှုရှိသည့် ကုန်စည်များကို
                      အင်တာနက်မှတဆင့် ကြိုရောင်း ကြိုဝယ်စနစ် (Futures) ဖြင့်
                      အပတ်စဉ် သို့မဟုတ် လစဉ် ဝင်ငွေအဖြစ် အရောင်းအဝယ်
                      လုပ်နေကြသည်မှာလည်း (၃) နှစ်ကျော် အတွေအကြုံ ရရှိထားကြသူများ
                      ဖြစ်ကြပါသည်။
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* content banner area end */}

          {/* footer area start */}
          <div className="footer_area">
            <div className="footer_container">
              <div calssName="footer_content">
                <p className="foot_p">
                  အပတ်စဥ်ပုံမှန် အပိုဝင်ငွေရှာချင်ရင် <br />
                  ယ‌နေ့ပင် အမည်စာရင်း ပေးလိုက်ပါ။
                </p>
              </div>
              <div class="button_area second_btn">
                <div class="btn_button sec_btn_button">
                  <a class="btn_area" href="#">
                    အမည်စာရင်း ပေးသွင်းရန်
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* footer area end */}
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Home;
