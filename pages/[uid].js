import Head from 'next/head'
import { createClient } from "../prismicio";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import { components } from "../slices";

export default function Home({page, settings}) {

  function toggleColor(){
    document.getElementById('toggle').classList.toggle('active');
    document.getElementById('content').classList.toggle('color');
    document.getElementById('content').classList.toggle('grey');
  }

  return (
    <>
      <Head>
        <title>{page.data.title}</title>
        <meta property="og:title" content={page.data.title} />
        <meta name="description" content={settings.data.google_description} />
        <meta property="og:description" content={settings.data.google_description}></meta>
        <meta property="og:image" content={settings.data.image.url} />
      </Head>
      <main className={` `}>   
        <div className="content color" id="content">
          <div className='header'>
            <h1>{page.data.title}</h1>
            <div className='right'>
              <div className='button' id="toggle" onClick={toggleColor}></div>
            </div>
          </div>
          <div className='slagzin slagzin-page'>
            {page.data.slagzin.map((item, i) => {
              return(
                <h2>{item.item}</h2>
              )
            })}
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

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", params.uid);
  const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page");

  return {
    paths: pages.map((page) => {
      return {
        params: { uid: page.uid },
      };
    }),
    fallback: false,
  };
}
