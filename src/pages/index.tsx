/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "@/components/Header";
import Banner from "@/components/Banner";
import Earn from "@/components/Earn";
import { Footer } from "@/components/Footer";
import CardSection from "@/Section/CardSection";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import useStore from '@/store/index';
import axios from 'axios'
import env from '@/commons/env'
const Home: NextPage = () => {
  const { productArray,updateProductArray } = useStore();
  function getProductListApi() {
    try {
      axios.get(env == 'dev' ? 'https://apitest.upsurge.finance/poolInfo/v1/avaliable' : 'https://api.upsurge.finance/poolInfo/v1/avaliable')
      .then(response=>{
        if(response.data.code == 200){
          let arr = response.data.data || []
          arr.map(item=>{
            item.abbrLogo= "USDT",
            item.abbrSubLogo= "/aave.png",
            item.abbrTitle = "USDT",
            item.abbrVersion= "SHAMBHALA",
            item.abbrExpireTime = item.maturity,
            item.maturity = item.maturity,
            item.abbrApy = item.apy,
            item.abbrCycle = item.cycle,
            item.network = "Ethereum",
            item.tvl = "",
            item.contractAddress = item.address
          })
          updateProductArray(arr)
        }
      })
      .catch(error=>console.error(error))
    } catch (error) {
      console.error("Error fetching table data:", error);
      return [];
    }
  }

  const router = useRouter();
  const { inviteCode } = router.query;
    useEffect(()=>{
      if(inviteCode){
        localStorage.setItem('inviteCode', inviteCode)
      }else{
        localStorage.removeItem('inviteCode')
      }
      getProductListApi()
    },[])
  const { t } = useTranslation("common");
  return (
    <div>
      <Head>
        <title>{t("earn")}</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Header logo switchTab type="fixed" tabType="normal" />
      <Banner />
      <CardSection />
      <Earn col />
      <Footer />
    </div>
  );
};

export default Home;
