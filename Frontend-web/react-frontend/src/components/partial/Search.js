import React, { useContext } from "react";
import { asyncContainer, Typeahead } from "react-bootstrap-typeahead";
import { GlobalStateContext } from "../../GlobalState";
import axios from "axios";
const AsyncTypeahead = asyncContainer(Typeahead);

const Search = props => {
  const { searchBarState, setSearchBarState } = useContext(GlobalStateContext);

  return (
    <div id="searchCityContainer" className="active-cyan-4">
      <AsyncTypeahead
        id="searchCity"
        labelKey="suggestion"
        isLoading={searchBarState.isLoading}
        onSearch={function(query) {
          setSearchBarState(prevSearchBarState => ({
            ...prevSearchBarState,
            isLoading: true
          }));
          axios({
            method: "GET",
            responseType: "json",
            url: `http://localhost:3000/api/autocomplete?query=${query}`,
            data: {}
          })
            .then(json => {
              const suggestions = json.data.data.map(item => ({
                id: item.id,
                suggestion: item.suggestion
              }));
              setSearchBarState(prevSearchBarState => ({
                ...prevSearchBarState,
                isLoading: false,
                options: suggestions
              }));
            })
            .catch(error => {
              console.log(error);
            });
        }}
        options={searchBarState.options}
        autoFocus
        bsSize="large"
        emptyLabel="لا يوجد نتائج"
        placeholder="(ولاية، مدينة..(بالفرنسية"
        searchText="..جاري البحث"
        promptText="أدخل إسم الولاية أو المدينة"
        selectHintOnEnter
        onChange={city => {
          if (city.length > 0) {
            var { id, suggestion } = city[0];
            setSearchBarState(prevSearchBarState => ({
              ...prevSearchBarState,
              selectedCityId: id,
              selectedCityName: suggestion
            }));
          } else {
            setSearchBarState(prevSearchBarState => ({
              ...prevSearchBarState,
              selectedCityId: -1,
              selectedCityName: null
            }));
          }
        }}
      />
    </div>
  );
};

export default Search;
