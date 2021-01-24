import React, { useContext } from "react";
import History, { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Footer from "../Footer/Footer";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";
import "./Homepage.scss";
import AuthContext from "../../context/authContext";

import DESK_URL from "../../assets/desk.png";

const Home = () => {
  const user = useContext(AuthContext);

  return (
    <Layout>
      <div className="header_banner_area">
        <div className="banner_header">
          <h2 className="banner_head_text">Zaw Finance</h2>
          <p className="banner_head_text_p">
            Providing Financial Education and Mentoring Services
          </p>
        </div>
      </div>

      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                Zaw Financial Solutions (ZFS)
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                <b>ဇော်တူးဆိုင်း </b>
                ဦးဆောင်ဖွဲ့စည်းထားသည့် နယူးယောက်မြို့ အခြေစိုက်
                <b> Zaw Financial Solutions</b> (ZFS – ‘ဇီ အက်ဖ် စက်’ လို့ အတို
                ခေါ်ပါသည်။) ကို မတ်လ (၂၀၂၀) မှာ တရားဝင် စတင်ခဲ့ပါတယ်။
                ဇော်တူးဆိုင်းသည် နယူးယောက်မြို့ရဲ့ အထင်ကရ ကိုလ်လန်ဘီယာ (Columbia
                University) တက္ကသိုလ်ကနေ ဘောဂဗေဒ မူဝါဒ ရေးရာဆိုင်ရာ မဟာဘွဲ့ကို
                (၂၀၁၅) မှာ ရရှိခဲ့ပြီ: သဌေးကြီးဂျော့ဆီုးရီုးစ် ရဲ့
                ဖောင်ဒေးရှင်းမှာ (၁၅) နှစ်ကြာ တာဝန်ထမ်းဆောင်ခဲ့ပါတယ်။ ZFS
                အဖွဲ့သားများသည် အ​မေရိကန်နိုင်ငံတွင် စတော့ရှယ်ယာများကို
                လက်လီအားဖြင့် ရေတိုရေရှည် ရင်းနှီးမြှုပ်နှံခြင်းနှင့် စျေးကွက်
                အတက်အကျအပေါ်မူတည်၍ အရောင်းအဝယ်များ ပြုလုပ်ခြင်း စသည့်
                အတွေ့အကြုံများကို (၁၀) နှစ်ကျော်မျှ ရရှိနေကြသူများ ဖြစ်ပြီး၊
                ရွှေ၊ ရေနံ၊ အမေရိကန်အစိုးရ၏ အတိုးနှုံးစာချုပ်များ (Bonds) နှင့်
                အခြား ငွေကြေးနှင့်ဆက်နွယ်မှုရှိသည့် ကုန်စည်များကို
                အင်တာနက်မှတဆင့် ကြိုရောင်း ကြိုဝယ်စနစ် (Futures) ဖြင့် အပတ်စဉ်
                သို့မဟုတ် လစဉ် ဝင်ငွေအဖြစ် အရောင်းအဝယ် လုပ်နေကြသည်မှာလည်း (၃)
                နှစ်ကျော် အတွေအကြုံ ရရှိထားကြသူများ ဖြစ်ကြပါသည်
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image bordered rounded size="large" src={DESK_URL} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              {user && user.isAuth() ? (
                <Button size="huge" color="teal" as={Link} to="/services">
                  အမည်စာရင်း ပေးသွင်းရန်
                </Button>
              ) : (
                <Button size="huge" color="teal" as={Link} to="/signup">
                  အမည်စာရင်း ပေးသွင်းရန်
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "3em" }} vertical>
        <Grid columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ padding: "3em" }}>
              <Icon name="graduation cap" size="huge" circular color="red" />
              <Header as="h3" style={{ fontSize: "2em" }}>
                ငွေကြေးဆိုင်ရာပညာပေး
              </Header>
              <p style={{ fontSize: "1.2em" }}>
                ZFS က စတော့ရှယ်ယာ နှင့် ငွေကြေးဆိုင်ရာ ကိစ္စရပ်များကို
                မြန်မာပြည်သားများအား ပညာပေးလိုသည့် ဆန္ဒဖြင့်
                ဖွဲ့စည်းထားခြင်းဖြစ်ပြီ: အခမဲ့ ဆွေးနွေးပွဲတွေ အင်တာနက်မှာ ကျင်းပ
                ပေးပါမည်။ စတော့ရှယ်ယာ စျေးကွက်တွေကို ရေရှည် (Professional)
                ပရော်ဖင်ရှင်နယ် အဖြစ်နှင့် စီးပွားရေး ဆန်ဆန် လုပ်ပြီး
                အသက်မွေးမှု လုပ်ငန်းလို ဝင်ငွေရှာချင်ပြီး ဂဃနဏ လေ့လာချင်ရင်တော့
                အခဲ့ကြေးငွေယူ သင်ကြားပေးမည် ဖြစ်ပါသည်။
              </p>
            </Grid.Column>
            <Grid.Column style={{ padding: "3em" }}>
              <Icon name="chart line" size="huge" circular color="teal" />
              <Header as="h3" style={{ fontSize: "2em" }}>
                အချိန်နှင့်တပြေးညီ လေ့လာသင်ယူ
              </Header>
              <p style={{ fontSize: "1.2em" }}>
                အချိန်နှင့် တပြေးညီ ကြိုရောင်း ကြိုဝယ်စနစ် (Futures) စျေးကွက်မှာ
                ဇော်တူးဆိုင်း အရောင်းအဝယ် လုပ်နေတာကို ကြည့်ပြီး
                အသင်မိတ်တွေတို့ပါ လေ့လာ သင်ယူ လုပ်ဆောင်နိုင်ပါသည်။ စတော့ရှယ်ယာ
                စျေးကွက်တွေ တက်တက် ကျကျ ငွေရှာလို့ရတဲ့ ဖြစ်နိုင်ခြေ
                အလားအလာများတဲ့ ဝယ်လို/ရောင်းလိုအား နည်းလမ်းတွေ သုံးသွားမည်
                ဖြစ်ပါသည်။
              </p>
            </Grid.Column>
            <Grid.Column style={{ padding: "3em" }}>
              <Icon name="certificate" size="huge" circular color="purple" />
              <Header as="h3" style={{ fontSize: "2em" }}>
                အတွေအကြုံ (Experience)
              </Header>
              <p style={{ fontSize: "1.2em" }}>
                ZFS အဖွဲ့သားများသည် အမေရိကန်နိုင်ငံတွင် စတော့ရှယ်ယာများကို
                လက်လီအားဖြင့် ရေတိုရေရှည် ရင်းနှီးမြှုပ်နှံခြင်းနှင့် စျေးကွက်
                အတက်အကျအပေါ်မူတည်၍ အရောင်းအဝယ်များ ပြုလုပ်ခြင်း စသည့်
                အတွေ့အကြုံများကို (၁၀) နှစ်ကျော်မျှ ရရှိနေကြသူများ ဖြစ်ပြီး၊
                ရွှေ၊ ရေနံ၊ အမေရိကန်အစိုးရ၏ အတိုးနှုံးစာချုပ်များ (Bonds) နှင့်
                အခြား ငွေကြေးနှင့်ဆက်နွယ်မှုရှိသည့် ကုန်စည်များကို
                အင်တာနက်မှတဆင့် ကြိုရောင်း ကြိုဝယ်စနစ် (Futures) ဖြင့် အပတ်စဉ်
                သို့မဟုတ် လစဉ် ဝင်ငွေအဖြစ် အရောင်းအဝယ် လုပ်နေကြသည်မှာလည်း (၃)
                နှစ်ကျော် အတွေအကြုံ ရရှိထားကြသူများ ဖြစ်ကြပါသည်။
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "8em 0em" }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: "2em" }}>
            အပတ်စဥ်ပုံမှန် အပိုဝင်ငွေရှာချင်ရင် ယ‌နေ့ပင် အမည်စာရင်း ပေးလိုက်ပါ။
          </Header>

          {user && user.isAuth() ? (
            <Button size="huge" color="teal" as={Link} to="/services">
              အမည်စာရင်း ပေးသွင်းရန်
            </Button>
          ) : (
            <Button size="huge" color="teal" as={Link} to="/signup">
              အမည်စာရင်း ပေးသွင်းရန်
            </Button>
          )}
        </Container>
      </Segment>

      <Footer />
    </Layout>
  );
};

export default Home;
