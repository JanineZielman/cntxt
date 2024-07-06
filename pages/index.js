import Head from 'next/head'
import { createClient } from "../prismicio";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import { components } from "../slices";
import Slider from "react-slick";

export default function Home({page, settings}) {

  function toggleColor(){
    document.getElementById('toggle').classList.toggle('active');
    document.getElementById('content').classList.toggle('color');
    document.getElementById('content').classList.toggle('grey');
  }

  var settingsSlider = {
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Head>
        <title>{page.data.title}</title>
        <meta property="og:title" content={page.data.title} />
        <meta name="description" content={settings.data.google_description} />
        <meta property="og:description" content={settings.data.google_description}></meta>
        <meta property="og:image" content={settings.data.image.url} />
      </Head>
      <main className={`home`}>   
        <div className="content color" id="content">
          <div className='header'>
            <h1>{page.data.title}</h1>
            <div className='right'>
              <div className='button' id="toggle" onClick={toggleColor}></div>
            </div>
          </div>
          <div className='slagzin'>
            <h2 className='first'>maakt</h2>
            <div className='animation'>
              <Slider {...settingsSlider}>
                {page.data.slagzin.map((item, i) => {
                  return(
                    <div><h2>{item.item}</h2></div>
                  )
                })}
              </Slider>
          
            </div>
            <h2 className='last'>van verschil</h2>
          </div>
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </main>
      <footer>
        <PrismicRichText field={settings.data.footer}/>
      </footer>
    </>
  )
}


export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const page = await client.getSingle("home");
  const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      settings,
    },
  };
}