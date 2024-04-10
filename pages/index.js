import Head from 'next/head'
import { createClient } from "../prismicio";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import { components } from "../slices";

export default function Home({page, settings}) {

  function toggleColor(){
    document.getElementById('toggle').classList.toggle('active');
    document.getElementById('content').classList.toggle('color');
  }

  return (
    <>
      <Head>
        <title>{page.data.title}</title>
      </Head>
      <main className={` `}>   
        <div className="content color" id="content">
          <div className='header'>
            <h1>{page.data.title}</h1>
            <div className='right'>
              <div className='button' id="toggle" onClick={toggleColor}></div>
              <h2>Maakt een wereld van verschil</h2>
            </div>
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