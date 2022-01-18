import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { HashRouter as Link } from "react-router-dom";

import { HeroContainer } from "../../Components";

import ajm from "./Partners/ajm.png";
import epfl from "./Partners/epfl.png";
import heidi from "./Partners/heidi.png";
import imi from "./Partners/imi.png";
import graphic from "./img/ML_graphic.svg";
import quote from "./img/ML_quote.svg";
import didactic from "./img/ML_didactic.svg";
import update from "./img/ML_update.svg";

const partners = [
  {
    name: "epfl",
    img: epfl,
    url: "https://www.epfl.ch",
  },
  {
    name: "academie-du-journalisme-et-des-medias",
    img: ajm,
    url: "https://unine.ch/ajm/",
  },
  {
    name: "heidi.news",
    img: heidi,
    url: "https://www.heidi.news",
  },
  {
    name: "media-initiative",
    img: imi,
    url: "https://www.media-initiative.ch/",
  },
];

export default function Home() {
  return (
    <div>
      <HeroContainer
        title="Media Laboratory"
        subtitle="Media Laboratory is a initiative aiming to develop data-journalism in Switzerland."
      />

      <div className="container" >
        <h3>Data meets journalism</h3>
        <p>
          Data-journalism is an emergent practice that helps journalists
          conveying complex stories with data-visualizations. Data stories have
          been used for years by technologist and hobbyists, but many challenges
          remain for a wider media adoption. Our project is an
          inter-disciplinary collaboration between{" "}
          <Link href="https://www.epfl.ch" rel="noreferrer">
            EPFL
          </Link>
          ,{" "}
          <Link href="https://unine.ch/ajm/" rel="noreferrer">
            AJM
          </Link>{" "}
          and{" "}
          <Link href="https://www.heidi.news/" rel="noreferrer">
            Heidi.news
          </Link>{" "}
          to identify those challenges and bootstrap open-source solutions for
          newsroom environments.
        </p>

        <h4 className="mt-12">Features</h4>
        <p>
          Our project aims to identify challenges faced by editorial teams, when
          creating data-supported content, as well as the difficulties
          encountered by public when exposed to these new article formats.
        </p>
        <div className="grid grid-cols-12 mt-12">
          <div className="col-span-5">
            <h5 className="mb-6">Embeddable graphics</h5>
            <div className="flex justify-between">
              <div className="w-2/5">
                <p>
                  Media Laboratory generates visualizations that can be embedded
                  everywhere with a single link. See{" "}
                  <Link component={RouterLink} to="/examples">
                    Examples
                  </Link>
                </p>
              </div>
              <div className="w-1/2">
                <img src={graphic} alt={graphic} />
              </div>
            </div>
          </div>

          <div className="col-span-5 col-end-13">
            <h5 className="mb-6">Didactic support</h5>
            <div className="flex justify-between">
              <div className="w-2/5">
                <p>
                  We developed a didactic system, made of cards, that appears on
                  top of technical terms in the figure and in the text. See{" "}
                  <Link component={RouterLink} to="/guidelines">
                    Guidelines
                  </Link>
                </p>
              </div>
              <div className="w-1/2">
                <img src={didactic} alt={didactic} />
              </div>
            </div>
          </div>

          <div className="col-span-5 ">
            <h5 className="mb-6">Continuous updates</h5>
            <div className="flex justify-between">
              <div className="w-2/5">
                <p>
                  We developpe a system that periodically update the
                  visualization, e.g. such as fetching data from a database
                  every day. See{" "}
                  <Link
                    href="https://github.com/News-Teller/media-laboratory"
                    rel="noreferrer"
                  >
                    Documentation
                  </Link>
                </p>
              </div>
              <div className="w-1/2">
                <img src={update} alt={update} />
              </div>
            </div>
          </div>

          <div className="col-span-5 col-end-13 ">
            <h5 className="mb-6">Quotes explorer</h5>
            <div className="flex justify-between">
              <div className="w-2/5">
                <p>
                  Quotes are often uttered by domain experts. Our tool
                  contuniously extracts quotes from articles and links them with
                  specific topics. See{" "}
                  <Link component={RouterLink} to="/quotes">
                    Quotes explorer
                  </Link>
                </p>
              </div>
              <div className="w-1/2">
                <img src={quote} alt={quote} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-4 border-primary border-dotted pt-12 mt-12">
        <div className="container border-b-4 border-primary border-dotted pb-12 mb-12">
          <div className="w-7/12 lg:pl-20">
            <h3 className="text-black">Getting started</h3>
            <div>
              We propose an open-source system that creates a production-ready
              environment for developing and deploying data-visualizations. Our
              system can easily be deployed with Docker and comes with a
              JupyterLab extension that manages your visualizations. Interested?
              Learn{" "}
              <Link component={RouterLink} to="/developers">
                how to deploy your own
              </Link>{" "}
              or check the project{" "}
              <Link
                href="https://github.com/News-Teller/media-laboratory"
                rel="noreferrer"
              >
                on Github
              </Link>
              .
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-around p-12 items-center">
        {partners.map((item) => (
          <div className="w-1/12" key={`partner-${item.name}`}>
            <a href={item.url} rel="noreferrer">
              <img src={item.img} className="" alt={item.name} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
