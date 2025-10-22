export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = 'Please login (10001)';
export const NOT_ADMIN_ERR_MSG = 'You do not have required permission (10002)';

// Facility information
export const FACILITIES = {
  mirai: {
    name: "MIRAI",
    fullName: "就労継続支援B型事業所 MIRAI",
    description: "一人ひとりの個性と能力を大切にし、自立した生活を目指すための就労支援を行っています。",
    address: "〒196-0025 東京都昭島市朝日町1-9-7 KKビル101",
    tel: "042-519-2942",
    fax: "042-519-4290",
    email: "info@mirainetwork2017.com",
    color: "blue",
  },
  hikari: {
    name: "HIKARI",
    fullName: "生活介護事業所 HIKARI",
    description: "日常生活の支援を通して、利用者様が安心して充実した毎日を過ごせるようサポートいたします。",
    address: "〒196-0004 東京都昭島市緑町5-1-6",
    tel: "042-519-1905",
    fax: "042-519-1906",
    email: "hikarinet2019@gmail.com",
    color: "cyan",
  },
  studio_m: {
    name: "studio M",
    fullName: "就労継続支援B型事業所 studio M",
    description: "創造的な活動を通して、利用者様の可能性を広げ、社会参加を支援します。",
    address: "〒196-0025 東京都昭島市朝日町1-6-2 haramo cuprum 302号室",
    tel: "042-519-7916",
    fax: "042-519-7917",
    email: "info@studiom.jp",
    color: "teal",
  },
} as const;

export const ORGANIZATION_INFO = {
  name: "一般社団法人未来ネットワーク",
  representative: "北村陽朗",
  established: "2016年7月1日",
  registeredAddress: "東京都八王子市小宮町1096-16",
  corporateNumber: "9010105001875",
  business: "障害福祉サービス事業",
  capital: "500万円",
} as const;
