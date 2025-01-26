import React, { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBox = ({ setSearchQuery, setCurrentPage }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleClear = () => {
        setQuery("");
        setSearchQuery("");
    };

    return (
        <div className="d-flex align-items-center">
            <div className="position-relative flex-grow">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search questions by title..."
                    className="form-control pl-3 pr-5"
                    style={{
                        maxWidth: "100%",
                        width: "100%",
                        minWidth: "250px",
                    }} // Ensures the width is flexible
                />
                <Search className="position-absolute top-50 end-0 translate-middle-y text-muted me-2" />
            </div>

            <button
                onClick={handleSearch}
                className="btn btn-gradient bg-primary text-white ms-2"
            >
                Search
            </button>
            <button
                onClick={handleClear}
                className="btn btn-outline-secondary ms-2"
            >
                <X className="me-2 h-4 w-4" /> Clear
            </button>
        </div>
    );
};

export default SearchBox;
