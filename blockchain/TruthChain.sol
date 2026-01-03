// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title TruthChain
 * @dev Stores news headlines permanently on the blockchain.
 */
contract TruthChain {
    // 1. Define the structure of a News Item
    struct NewsItem {
        uint256 id;
        string title;
        string content;
        string category; // e.g., "Politics", "Tech"
        uint256 timestamp;
        address author;
    }

    // 2. A list to hold all news items
    NewsItem[] public newsFeed;

    // 3. Event: This alerts the frontend when news is published
    event NewsPublished(uint256 id, string title, address author, uint256 timestamp);

    // 4. Function to Publish News
    function publishNews(string memory _title, string memory _content, string memory _category) public {
        // Validation: Title cannot be empty
        require(bytes(_title).length > 0, "Title is required");
        require(bytes(_content).length > 0, "Content is required");

        // Create the new item
        NewsItem memory newItem = NewsItem({
            id: newsFeed.length,
            title: _title,
            content: _content,
            category: _category,
            timestamp: block.timestamp,
            author: msg.sender
        });

        // Add to the list
        newsFeed.push(newItem);

        // Emit the event
        emit NewsPublished(newItem.id, _title, msg.sender, block.timestamp);
    }

    // 5. Function to get all news (for the Frontend)
    function getAllNews() public view returns (NewsItem[] memory) {
        return newsFeed;
    }

    // 6. Function to get total count
    function getNewsCount() public view returns (uint256) {
        return newsFeed.length;
    }
}