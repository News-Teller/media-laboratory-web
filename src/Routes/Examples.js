import React from 'react';

import { HeroContainer } from '../Components'
import { CopyBlock, solarizedLight } from "react-code-blocks";


const links = [
  "https://embed.newsteller.io/5eebe705f89e",
  "https://embed.newsteller.io/253718200f2d",
  "https://embed.newsteller.io/3d66162d4c40",
  "https://embed.newsteller.io/e64bcb3f4c68",
];

const getIdFromEmbedViz = (url) => {
  return url.substring(url.lastIndexOf('/')+1)
}



export default function Examples() {


  return (
    <div className="">
      <HeroContainer
        title="Examples"
        subtitle="Media Laboratory generates visualizations that can be embedded everywhere with a single link."
        backgroundColor="#2618B1"
        backgroundElementsFill="%230b5fa4"
      />
      <div className="container">
        <div className="grid grid-cols-2 gap-6">
          {links.map((link) => {
            const vid = getIdFromEmbedViz(link);

            return (
              <div key={`viz-fragment-${vid}`} className="bg-gray-100 rounded-sm p-4">
                <div key={`viz-grid-dx-${vid}`} item sm={12} md={6}>
                  <iframe key={`viz-iframe-${vid}`} title={getIdFromEmbedViz(link)} src={link} width="100%" height="500px" frameBorder="0"></iframe>
                </div>
                <div className="mt-4">
                  <CopyBlock
                    key={`viz-code-${vid}`}
                    text={link}
                    language={"bash"}
                    showLineNumbers={false}
                    theme={solarizedLight}
                    codeBlock
                    customStyle={{borderRadius: '0.5rem'}}
                  />
                </div>
              </div>
          )})}
        </div>
      </div>
    </div>
  );
}
