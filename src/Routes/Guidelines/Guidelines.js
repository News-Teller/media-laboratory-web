import React, { useState, useEffect } from "react";
import { LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { HeroContainer, MediaCard, SplitView } from "../../Components";
import useScripts from "../../Hooks/useScripts";
import "./Guidelines.css";

import searchIcon from "./img/search-light.svg";



export default function GuideLines() {


  // Set a limit on selectable cards
  const selectionLimit = 5;

  // Define states.
  // First one contains potential errors
  // from fetching json card data
  const [error, setError] = useState(false);

  // Second contains the full cards data
  const [cardsData, setCardsData] = useState(null);

  // Third contains filtered items ids
  const [filtered, setFiltered] = useState([]);

  // Fourth contains selected items ids
  const [selected, setSelected] = useState([]);

  // This function handles the filtering of items from the search
  // In some way, a map cardsData -> itemList
  const handleSearch = () => (event) => {
    if (!cardsData) return;
    const keyword = event.target.value.toLowerCase();
    setFiltered(
      cardsData
        .filter(
          (content) => content.definition.toLowerCase().search(keyword) > -1
        )
        .map((item) => item.id)
    );
  };

  // This function handles the selection of cards
  const handleSelection = (item) => {
    if (selected.includes(item.id)) {
      // Remove item from selection
      setSelected((prevState) => prevState.filter((elem) => elem !== item.id));
    } else if (selected.length <= selectionLimit) {
      // Add item to selection
      setSelected((prevState) => [...prevState, item.id]);
    }
  };

  // Fetch guideline cards data
  useEffect(() => {
    async function fetchData() {
      const { PUBLIC_URL } = process.env;
      const response = await fetch(`${PUBLIC_URL}/guidelines.json`);

      if (response.status === 200) {
        const body = await response.json();

        if (!body || !body.guidelines) return;

        // Set full guidelines data
        setCardsData(body.guidelines);
      } else {
        console.warn(response);

        setError(response.statusText || "internal error");
      }
    }
    fetchData();
  }, []);

  // Popovers elements needs to be recomputed each time a new card is selected
  // because trigger elements need to be re-parsed from the document
  useEffect(() => {
    const reloadPopoversjsElements = window["reloadPopoversjsElements"];
    if (reloadPopoversjsElements) {
      reloadPopoversjsElements();
    } else {
      console.warn("reloadPopoversjsElements is missing!");
    }
  }, [selected.length]);

  // Add popoversjs script and dependancies
  const popoversjsDeps = [
    "https://polyfill.io/v3/polyfill.min.js?features=fetch%2Ces2018%2CPromise%2CArray.prototype.find%2CObject.assign",
    "https://unpkg.com/@popperjs/core@2",
    `https://news-teller.github.io/media-laboratory-web/popovers.js`,
  ];
  useScripts(popoversjsDeps);

  return (
    <div>
      <HeroContainer
        title="Guidelines"
        subtitle="We developed a didactic system, made of cards, that appears on top of technical terms in the figure and in the text."
        backgroundColor="#e40045"
        backgroundElementsFill="%23fe5600"
      />
      <div className="container">
        {/* DEMO section */}
        <div className="rounded-sm bg-gray-200 p-6 mb-8">
          <h4>Demo</h4>
          <SplitView
            cardItems={
              cardsData
                ? cardsData.filter((item) => selected.includes(item.id))
                : []
            }
          />
        </div>

        {/* CARDS section */}
        <h4>Cards</h4>
        <div className="py-5 mb-10 flex border-b border-primary w-6/12">
        <img className="w-6 mr-4" src={searchIcon} alt={searchIcon} />
          <input
            type="text"
            name="first-name"
            id="first-name"
            autoComplete="given-name"
            className=" block text-xl text-primary  focus:border-0 placeholder:text-primary"
            placeholder="Search"
            onChange={handleSearch()}
          />
        </div>

        {!cardsData && !error && <LinearProgress color="secondary" />}
        {cardsData && !error && (
          <div className="grid grid-cols-3 gap-4">
            {cardsData
              .filter((item) => {
                if (filtered.length === 0) return true;
                else return filtered.includes(item.id);
              })
              .map((item) => {
                const isSelected = selected.includes(item.id);

                return (
                  <div key={`guideline-card-${item.id}`} >
                    <MediaCard
                      id={item.id}
                      term={item.term}
                      definition={item.definition}
                      link={item.link}
                      synonyms={item.synonyms}
                      tags={item.tags}
                      isSelected={isSelected}
                      onSelection={() => handleSelection(item)}
                      isDisabled={
                        !isSelected && selected.length >= selectionLimit
                      }
                    />
                  </div>
                );
              })}
          </div>
        )}
        {!cardsData && error && (
          <Alert severity="error">Oops, Something Went Wrong</Alert>
        )}
      </div>
    </div>
  );
}
