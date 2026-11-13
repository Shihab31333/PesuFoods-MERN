import React from 'react';
import MenuItem from './MenuItem';
import './SearchResults.css';

const SearchResults = ({ searchResults, loading }) => (
    <div className="search-results">
        {loading && <p>Loading results...</p>}
        {!loading && searchResults.length === 0 && <p>No results found.</p>}
        <div className="menu-items">{searchResults.map((item) => <div key={item._id} className="menu-item"><p>{item.canteen?.name}</p><MenuItem item={item} /></div>)}</div>
    </div>
);

export default SearchResults;
