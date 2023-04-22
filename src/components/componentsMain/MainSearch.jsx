import "./mainSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mantine/core";
import { selectAllRestorani } from "../../features/restorani/restoraniApiSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Modal, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
function MainSearch() {
  const [restoraniSearch, setRestoraniSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const restorani = useSelector(selectAllRestorani);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (!event.target.closest(".searchNavigacija")) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (suggestions.length > 0) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [suggestions]);

  const handleRestoraniInput = (e) => {
    const searchInput = e.target.value.trim();
    setRestoraniSearch(e.target.value);
    // update suggestions based on current search input
    if (searchInput !== "") {
      setSuggestions(
        restorani.filter((restoran) =>
          restoran.naziv
            .toLowerCase()
            .startsWith(e.target.value.toLowerCase().trim())
        )
      );
    } else {
      setSuggestions([]);
    }
  };
  // PROBLEM JE U WHITESPACEOVIMA
  const handleSearchClick = () => {
    let matchFound = false;
    const searchInput = restoraniSearch.trim();
    console.log(searchInput);
    for (let i = 0; i < restorani.length; i++) {
      if (searchInput.toLowerCase() === restorani[i].naziv.toLowerCase()) {
        navigate(`/main/${restorani[i].id}`);
        matchFound = true;
        console.log(
          restorani[i].naziv + "" + restorani[i].id + "" + searchInput
        );
        break;
      }
    }
    if (!matchFound) {
      setModalOpen(true);
    }
  };
  return (
    <>
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="FoodSprint Pretraga"
        className="modal"
      >
        Ne postoji restoran sa tim imenom!
      </Modal>
      <div className="searchNavigacija">
        <div className="inputContainerMain">
          <input
            type="text"
            name=""
            id=""
            className="mainInput"
            placeholder="Pronađite restoran"
            onChange={handleRestoraniInput}
            onBlur={handleClickOutside}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="faSearchMain" />
          <button className="searchBtnMain" onClick={handleSearchClick}>
            Traži
          </button>
          {/* render suggestions container */}
          {suggestions.length > 0 && (
            <div
              className={`suggestions-container ${
                suggestions.length === 0 ? "hidden" : ""
              }`}
            >
              {suggestions.map((suggestion) => (
                <div
                  className="suggestion"
                  key={suggestion.id}
                  onClick={() => navigate(`/main/${suggestion.id}`)}
                >
                  {suggestion.naziv}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default MainSearch;
