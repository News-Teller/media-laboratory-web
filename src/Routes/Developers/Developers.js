import React from "react";
import { CopyBlock, solarizedLight } from "react-code-blocks";
import { HeroContainer } from "../../Components";

import Example from "./Example";

// Codes
const deployment1 = `git clone https://github.com/News-Teller/media-laboratory.git`;
const deployment2 = `docker build -t medialab-notebook notebook
docker-compose build`;
const deployment3 = `docker-compose up -d`;

export default function Developers() {
  return (
    <div>
      <HeroContainer
        title="Developers"
        subtitle="This section will help you deploying the Media Laboratory environnement."
        backgroundColor="#67e300"
        backgroundElementsFill="%2300a372"
      />

      <div className="container">
        {/* DEPLOYMENT */}
        <div>
          <h3>Deployment</h3>
          <div>
            Follow this steps to deploy the Media Laboratory environnement
            locally. For more information, visit the{" "}
            <a
              href="https://github.com/News-Teller/media-laboratory"
              rel="noreferrer"
            >
              GitHub repository
            </a>
            .
            <br />
            These instructions require{" "}
            <a href="https://www.docker.com/" rel="noreferrer">
              Docker
            </a>{" "}
            and{" "}
            <a href="https://docs.docker.com/compose/install/" rel="noreferrer">
              Docker Compose
            </a>{" "}
            to be installed.
          </div>
        </div>
        <div className="grid lg:grid-cols-4 gap-6 border-b-4 border-dotted border-primary pb-6 mb-6">
          <div className="bg-gray-100 p-4 pt-2 relative mt-8">
            <div className="number--cirlce absolute relative -top-5 font-bold text-white">
              1
            </div>
            <div className="mb-3">Clone the GitHub repository</div>
            <CopyBlock
              text={deployment1}
              language={"bash"}
              showLineNumbers={false}
              theme={solarizedLight}
              codeBlock
            />
          </div>
          <div className="bg-gray-100 p-4 pt-2 relative mt-8">
            <div className="number--cirlce absolute relative -top-5 font-bold text-white">
              2
            </div>
            <div>Build the custom docker images</div>
            <CopyBlock
              text={deployment2}
              language={"bash"}
              showLineNumbers={false}
              theme={solarizedLight}
              codeBlock
            />
          </div>
         
          <div className="bg-gray-100 p-4 pt-2 relative mt-8">
          <div className="number--cirlce absolute relative -top-5 font-bold text-white">
              3
            </div>
            <div>Run the servicess</div>
            <CopyBlock
              text={deployment3}
              language={"bash"}
              showLineNumbers={false}
              theme={solarizedLight}
              codeBlock
            />
          </div>

          <div className="bg-gray-100 p-4 pt-2 relative mt-8">
          <div className="number--cirlce absolute relative -top-5 font-bold text-white">
              4
            </div>
            <div>
              Access JupyterHub at 
              <CopyBlock
              text={"http://localhost:8000"}
              language={"bash"}
              showLineNumbers={false}
              theme={solarizedLight}
              codeBlock
            />
              
              and your
              visualizations at 
              <CopyBlock
              text={"http://localhost:8080/&lt;uid&gt;"}
              language={"bash"}
              showLineNumbers={false}
              theme={solarizedLight}
              codeBlock
            />
             
            </div>
            <img
              src={"https://jupyter.org/assets/labpreview.png"}
              alt="notebook environment preview"
              width="75%"
            />
          </div>
        </div>
        {/* Example */}
        <div className="w-8/12 m-auto">
        <Example />
        </div>
      </div>
    </div>
  );
}
