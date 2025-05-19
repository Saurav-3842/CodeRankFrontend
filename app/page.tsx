'use client';
import  { useRef, Suspense }from "react";
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
    <main >
      <Navbar onSignUpClick={() => formRef.current?.scrollToFullName()}/>
      <Suspense fallback={<div className="text-center text-white py-10">Loading form...</div>}>
        <CodeProfileForm ref={formRef} />
      </Suspense>
      <CodeRankSteps />
      <ComparisonTable/>
      <Banner onSignUpClick={() => formRef.current?.scrollToFullName()}/>
      <Testimonials />
      <Milestones/>
      <Footer/>
        
    </main>
  );
}
