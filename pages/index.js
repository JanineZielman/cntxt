import Head from 'next/head'
import { createClient } from "../prismicio";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import { components } from "../slices";

export default function Home({page, settings}) {

  return (
    <>
      <Head>
        <title>{page.data.title}</title>
      </Head>
      <main className={` `}>   
        <div className="content">
          <h1>{page.data.title}</h1>
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