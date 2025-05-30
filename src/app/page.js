"use client"
import Head from "next/head";
import Header from "../components/Header";
import ListingCard from "../components/ListingCard";
import RandomListingModal from "../components/RandomListingModal";
import Footer from "../components/Footer";
import { useState, useEffect, useCallback } from "react";
import { getSocialIcon, getContrastColor } from "../utils";
import styles from "../styles/Home.module.css";
import globalStyles from "../styles/global.module.css";
import '../styles/global.css';

const listingsData = [
  // 社區組織
  {
    id: 2,
    name_zh: "多倫多香港人社區中心 HongKonger Community Centre Toronto",
    handle: "@hkcctoronto",
    category_zh: "社區組織",
    website: "https://instagram.com/hkcctoronto",
    info_zh: "多倫多香港人社區中心期望為移居多倫多的香港人提供聚腳機會，保存在加港人的身分認同，發揚香港人互助精神；致力在加拿大的多元文化社會中，宣揚香港文化和價值；每月最後一個星期六有定期聚會。",
    icon_text: "中",
    logo_url: "https://placehold.co/180x180/007bff/FFFFFF?text=中&font=inter",
    theme_color_hex: "#007bff"
  },
  {
    id: 3,
    name_zh: "calgaryhkerssc",
    handle: "@calgaryhkerssc",
    category_zh: "社區組織",
    website: "https://threads.net/@calgaryhkerssc",
    info_zh: "卡加利香港人聯誼會，旨在為當地香港社群提供交流平台，組織各種社交活動，增進社區聯繫。",
    icon_text: "卡",
    logo_url: "https://placehold.co/180x180/28a745/FFFFFF?text=卡&font=inter",
    theme_color_hex: "#28a745"
  },
  {
    id: 4,
    name_zh: "ottawahkers",
    handle: "@ottawahkers",
    category_zh: "社區組織",
    website: "https://threads.net/@ottawahkers",
    info_zh: "渥太華香港人聯誼群組，專為渥太華的香港人提供聯繫和支持，促進文化交流和社區凝聚力。",
    icon_text: "渥",
    logo_url: "https://placehold.co/180x180/808080/FFFFFF?text=渥&font=inter", // Grey for null color
    theme_color_hex: null
  },
  // 餐廳與茶飲
  {
    id: 5,
    name_zh: "Phoenix Cafe 金鳳冰室",
    handle: "@phoenixcafe.northyork",
    category_zh: "餐廳與茶飲",
    website: "https://threads.net/@phoenixcafe.northyork",
    info_zh: "位於多倫多北約克（38 Forest Manor Road, North York, Toronto），這家餐廳提供正宗港式美食，深受當地香港人喜愛，是體驗家鄉味道的好去處。",
    icon_text: "鳳",
    logo_url: "https://placehold.co/180x180/FFA500/000000?text=鳳&font=inter",
    theme_color_hex: "#FFA500"
  },
  {
    id: 6,
    name_zh: "Ho Yuen Cafe",
    handle: "@hoyuencafe",
    category_zh: "餐廳與茶飲",
    website: "https://instagram.com/hoyuencafe",
    info_zh: "位於溫哥華，Ho Yuen Cafe以港式茶餐廳風格為特色，承載「獅子山精神」，提供經典港式美食如奶茶、菠蘿包等，是溫哥華香港社群的熱門聚點。",
    icon_text: "好",
    logo_url: "https://placehold.co/180x180/FFC107/000000?text=好&font=inter",
    theme_color_hex: "#FFC107"
  },
  {
    id: 10,
    name_zh: "ICHA TEA",
    handle: "@ichateaca",
    category_zh: "餐廳與茶飲",
    website: "https://instagram.com/ichateaca",
    info_zh: "由香港人創立的高品質亞洲茶飲品牌，專注於提供優質茶飲及甜品，適合喜愛亞洲風味飲品的顧客。",
    icon_text: "茶",
    logo_url: "https://placehold.co/180x180/00CED1/FFFFFF?text=茶&font=inter",
    theme_color_hex: "#00CED1"
  },
  {
    id: 12,
    name_zh: "jacks__spot",
    handle: "@jacks__spot",
    category_zh: "咖啡店與烘焙",
    website: "https://instagram.com/jacks__spot",
    info_zh: "由前香港灣仔Roots主廚創立，位於溫哥華，主打手工酸種麵包及甜品，為顧客提供高品質的烘焙體驗。",
    icon_text: "J",
    logo_url: "https://placehold.co/180x180/6F4E37/FFFFFF?text=J&font=inter",
    theme_color_hex: "#6F4E37"
  },
  {
    id: 14,
    name_zh: "在加散步",
    handle: "@walkincanada",
    category_zh: "攝影",
    website: "https://instagram.com/walkincanada",
    info_zh: "利用散步和遊走，了解加拿大社區、城市以至國家。",
    icon_text: "攝",
    logo_url: "https://placehold.co/180x180/333333/FFFFFF?text=攝&font=inter",
    theme_color_hex: "#333333"
  },
  {
    id: 16,
    name_zh: "Twosis In Toronto",
    handle: "@twosis_canada",
    category_zh: "理財與個人成長",
    website: "https://threads.net/@twosis_canada",
    info_zh: "位於多倫多，專注於分享加拿大理財、投資及省錢資訊，幫助香港移民適應當地生活並實現財務目標。",
    icon_text: "財",
    logo_url: "https://placehold.co/180x180/00509E/FFFFFF?text=財&font=inter",
    theme_color_hex: "#00509E"
  },
  {
    id: 7,
    name_zh: "New Treasure Restaurant",
    handle: "@newtreasureresale",
    category_zh: "餐廳與茶飲",
    website: "https://www.tripadvisor.ca/Restaurant_Review-g155019-d3181796-Reviews-New_Treasure-Toronto_Ontario.html",
    info_zh: "這家全天營業的港式點心酒樓堅持傳統手藝，提供正宗港式點心，適合喜愛傳統粵菜的饕客。",
    icon_text: "新",
    logo_url: "https://placehold.co/180x180/808080/FFFFFF?text=新&font=inter", // Grey for null color
    theme_color_hex: null
  },
  {
    id: 8,
    name_zh: "Wok Theory 新天虹",
    handle: "@woktheory",
    category_zh: "餐廳與茶飲",
    website: "https://www.instagram.com/woktheory/",
    info_zh: "位於多倫多，主打粵菜及港式海鮮，融合傳統與現代元素，提供獨特的餐飲體驗。",
    icon_text: "鑊",
    logo_url: "https://www.instagram.com/woktheory/",
    theme_color_hex: "#dc3545"
  },
  {
    id: 9,
    name_zh: "goodluckhkcafe",
    handle: "@goodluckhkcafe",
    category_zh: "餐廳與茶飲",
    website: "https://www.instagram.com/goodluckhkcafe/?hl=en",
    info_zh: "主打經典港式茶餐廳美食，如菠蘿包、奶茶等，為顧客帶來懷舊的香港味道。",
    icon_text: "吉",
    logo_url: "https://www.instagram.com/goodluckhkcafe/?hl=en",
    theme_color_hex: null
  },
  {
    id: 11,
    name_zh: "日見食堂",
    handle: "@genkikitchen.ca",
    category_zh: "餐廳與茶飲",
    website: "https://threads.net/@genkikitchen.ca",
    info_zh: "Fuel up, drink slow, stay Genki!\\n(A very soft opening now)\\n吃飽．睡好.\\n然後—聽日見～",
    icon_text: "日",
    logo_url: "https://www.instagram.com/genkikitchen.ca/",
    theme_color_hex: "#FFD700"
  },
  {
    id: 13,
    name_zh: "havenbrews",
    handle: "@havenbrews",
    category_zh: "咖啡店與社區中心",
    website: "https://instagram.com/havenbrews",
    info_zh: "這家咖啡店兼具社區中心功能，是香港社群聚會和交流的理想場所，提供舒適的環境和優質咖啡。",
    icon_text: "H",
    logo_url: "https://www.instagram.com/havenbrews/?hl=en",
    theme_color_hex: "#87CEEB"
  },
  {
    id: 15,
    name_zh: "banffbeartravel",
    handle: "@banffbeartravel",
    category_zh: "旅遊",
    website: "https://threads.net/@banffbeartravel",
    info_zh: "位於班夫及賈斯珀，提供小團體及私人旅遊服務，是探索加拿大洛磯山脈的理想選擇。",
    icon_text: "旅",
    logo_url: "https://www.banffbeartravel.com/",
    theme_color_hex: "#17a2b8"
  },
  {
    id: 17,
    name_zh: "referalah",
    handle: "@referalah",
    category_zh: "開源平台",
    website: "https://threads.net/@referalah",
    info_zh: "另一個海外港人平台，專注於資源共享和社群建設，幫助香港人在加拿大建立聯繫。",
    icon_text: "源",
    logo_url: "https://threads.net/@referalah",
    theme_color_hex: "#6c757d"
  },
  {
    id: 20,
    name_zh: "陌言舍 | 多倫多的陌路人故事",
    handle: "hkstrangers.ca",
    category_zh: "社群平台",
    website: "https://www.threads.com/@hkstrangers.ca",
    info_zh: "說話 Talk 🗣️| 玩樂 Play 🎉| 成長 Grow🌱\n在這片尚待編織的土地上，重新找到彼此。\n🔺🔺🔺🔺🔺\n專為香港人🇭🇰在多倫多🇨🇦打造的社群平台，在陌生的環境中，透過真誠的交流💬、創意的活動🎨，與自己和他人共鳴、成長。\n🔺🔺🔺🔺🔺\n沿途，有你！✨ #FollowUs",
    icon_text: "陌言舍",
    logo_url: "https://www.threads.com/@hkstrangers.ca",
    theme_color_hex: "" // Empty string, placeholder grey
  },
  {
    id: 21,
    name_zh: "topdoggorou\n",
    handle: "topdoggorou",
    category_zh: "素人",
    website: "https://www.threads.com/@topdoggorou",
    info_zh: "柴犬大將辦公室 🐾\n字型設計、cosplayer、O1\n💭: INFJ - 6w7 - 638\nEnglish | 粵\nCanada 🇨🇦 | 香港 🇭🇰\n",
    icon_text: "G",
    logo_url: "https://www.threads.com/@topdoggorou",
    theme_color_hex: null // null, placeholder grey
  },
  {
    id: 22,
    name_zh: "多倫多8折的",
    handle: "call_car_main",
    category_zh: "香港司機",
    website: "https://www.threads.com/@call_car_main",
    info_zh: "仿香港8折的\n出發前查看定價，抵達時再收款！\n名額有限，先到先得，Follow我，有需要隨時DM我IG吧！\n",
    icon_text: "的",
    logo_url: "https://www.threads.com/@call_car_main",
    theme_color_hex: null // null, placeholder grey
  },
  {
    id: 18,
    name_zh: "ChiChiu Lam",
    handle: "@chichiulam",
    category_zh: "素人",
    website: "https://www.threads.com/@chichiulam?hl=en",
    info_zh: "🇭🇰 Hong Konger in 🇨🇦, Hongkongais au 🇨🇦\nvegetarian 素人 🥕\n主要分享下法文(冷)知識, 間唔中分享下加拿大生活, 文化, 經驗等等\nPartager mes connaissances de la langue française",
    icon_text: "C",
    logo_url: "https://placehold.co/180x180/808080/FFFFFF?text=C&font=inter", // Grey for null logo
    theme_color_hex: null
  },
  {
    id: 1,
    name_zh: "加拿大時政快訊 Latitude 22.3°N, Canada",
    handle: "@hkcaowpinfo",
    category_zh: "社區組織",
    website: "https://instagram.com/hkcaowpinfo",
    info_zh: "為你講解最新加拿大時政事件生活資訊 | 移民資訊\\n重奪加國網絡 | 建立港人社群\\n#加拿大移民 #canada #hkpathway",
    icon_text: "加",
    logo_url: "https://placehold.co/180x180/D8292F/FFFFFF?text=加&font=inter",
    theme_color_hex: "#D8292F"
  },
  {
    id: 19,
    name_zh: "Maple Waves",
    handle: "@maplewaves.ca",
    category_zh: "新聞平台",
    website: "https://www.threads.com/@maplewaves.ca?hl=en",
    info_zh: "Maple Waves 由多倫多出發，將加拿大新聞與資訊帶俾大家。\n星期一至五黃昏上載加拿大新聞。經營壓力巨大，極需訂閱YouTube支持。(下面有link訂閱)\n報料/廣告/合作: 1 (437) 255-2383 or news@maplewaves.ca",
    icon_text: "M",
    logo_url: "https://www.threads.com/@maplewaves.ca?hl=en",
    theme_color_hex: null
  },
  {
    id: 23,
    name_zh: "加拿大賺錢理財資訊🇨🇦",
    handle: "growwealth_canada",
    category_zh: "理財資訊",
    website: "https://www.threads.com/@growwealth_canada",
    info_zh: "💰提供喺加拿大🇨🇦賺額外收入,慳錢, 理財小貼士和優惠",
    icon_text: "錢",
    logo_url: "https://www.threads.com/@growwealth_canada",
    theme_color_hex: null
  },
  {
    id: 24,
    name_zh: "YinaLui",
    handle: "godhands_yina",
    category_zh: "故事",
    website: "https://www.threads.com/@godhands_yina",
    info_zh: "🇭🇰🇨🇦Markham 多倫多 髮型師 社工成為髮型師的故事",
    icon_text: "🇭🇰🇨🇦Markham 多倫多 髮型師 社工成為髮型師的故事",
    logo_url: "https://www.threads.com/@growwealth_canada",
    theme_color_hex: null
  }

]

export default function Home() {
  const [listings, setListings] = useState(listingsData);
  const [currentFilter, setCurrentFilter] = useState("全部");
  const [categories, setCategories] = useState([]);
  const [randomListing, setRandomListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const uniqueCategories = [
      "全部",
      ...new Set(listingsData.map((item) => item.category_zh).sort()),
    ];
    setCategories(uniqueCategories);
  }, []);

  const filterListings = useCallback((category) => {
    setCurrentFilter(category);
    if (category === "全部") {
      setListings(listingsData);
    } else {
      const filtered = listingsData.filter(
        (item) => item.category_zh === category
      );
      setListings(filtered);
    }
  }, []);

  const showRandomListing = useCallback(() => {
    if (listingsData.length > 0) {
      const randomIndex = Math.floor(Math.random() * listingsData.length);
      setRandomListing(listingsData[randomIndex]);
      setIsModalOpen(true);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setRandomListing(null);
  }, []);

  const filteredListings =
    currentFilter === "全部"
      ? listings
      : listings.filter((item) => item.category_zh === currentFilter);

  return (
    <div>
      <Head>
        <title>🇨🇦加拿大港人黃頁🇨🇦</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header />

      <div className={`${globalStyles.container} ${styles.filterContainer}`}>
        <div id="category-filters" className={styles.filterButtons}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterButton} ${
                currentFilter === category ? styles.active : ""
              }`}
              onClick={() => filterListings(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button className={styles.randomButton} onClick={showRandomListing}>
          ✨ 隨機精選 ✨
        </button>
      </div>

      <main className={`${globalStyles.container} ${styles.container}`}>
        <div id="listings-grid" className={styles.listingsGrid}>
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          ) : (
            <div id="no-results" className={styles.noResults}>
              <p className={styles.noResultsEmoji}>😔</p>
              <p>暫時未有符合條件嘅項目。</p>
            </div>
          )}
        </div>
      </main>

      <RandomListingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        randomListing={randomListing}
      />
      <Footer />
    </div>
  );
}
