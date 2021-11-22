export default (state, action) => {
  switch (action.type) {
    case "ADD_COUNTRY": {
      console.log(action);
      return {
        ...state,
        countryData: action.payload.countryData,
      };
    }
    case "SINGLE_COUNTRY": {
      return {
        ...state,
        country: action.payload.country,
      };
    }
    case "loading": {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }
    case "error": {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case "SEARCH_COUNTRY": {
      return {
        ...state,
        searchCountryData: action.payload.searchCountryData,
      };
    }

    default:
      return state;
  }
};
