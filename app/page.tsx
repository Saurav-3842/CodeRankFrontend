'use client';
import { useRef } from "react";
import Navbar from "@/components/Navbar/navbar";
import CodeProfileForm from "./_homepageComponent/codeProfleForm/CodeProfileForm";
import CodeRankSteps from "./_homepageComponent/howCodeRankWork/codeRankSteps";
import Banner from "./_homepageComponent/promotionBanner/banner";
import Testimonials from "./_homepageComponent/testimonials/testimonials";
import Milestones from "./_homepageComponent/milestone/milestone";
import Footer from "./_homepageComponent/footer/footer";
import ComparisonTable from "./_homepageComponent/comparisonTable/comparionTable";

export default function Home() {
  const formRef = useRef<{ scrollToFullName: () => void }>(null);
  
  return (
    <div className="">
      <Navbar onSignUpClick={() => formRef.current?.scrollToFullName()}/>
      <CodeProfileForm ref={formRef}/>
      <CodeRankSteps />
      <ComparisonTable/>
      <Banner onSignUpClick={() => formRef.current?.scrollToFullName()}/>
      <Testimonials />
      <Milestones/>
      <Footer/>
        
    </div>
  );
}
