import {saveAllData} from '../common/save_json'
import allData from '../assets/jsons/allData.json'
import geAuthorWithCommentCount from '../assets/jsons/processed/geAuthorWithCommentCount.json'
import geTopicWithCommentCount from '../assets/jsons/processed/geTopicWithCommentCount.json'
import getUniqueAuthors from '../assets/jsons/processed/getUniqueAuthors.json'
import getUniqueTopics from '../assets/jsons/processed/getUniqueTopics.json'
import groupedByYearAndAuthor from '../assets/jsons/processed/groupedByYearAndAuthor.json'
import groupedByYearAndTopic from '../assets/jsons/processed/groupedByYearAndTopic.json'
import groupedByTopicAndAuthor from '../assets/jsons/processed/groupedByTopicAndAuthor.json'
import groupedByYearAndTopicCountComment from '../assets/jsons/processed/groupedByYearAndTopicCountComment.json'


export const getTotalComments = () => allData.reduce((sum, item) => sum + parseInt(item.comment, 10), 0);

export const getTotalRecords = () => allData.length;

export const groupedByYearAndTopicFilterByTopic = (topic) => (allData.filter(item => item.topic.includes(topic))).reduce((acc, entry) => {

    if (entry.date !== null && entry.date !== "null" && entry.date !== "") {
        const year = entry.date.split("/")[2]; // Extract the year from the date
        acc[year] = acc[year] || {};
        getUniqueAuthors.forEach((topic) => {
            acc[year][topic] = acc[year][topic] || 0;
        });

        acc[year][entry.topic] += 1;
    }
    return acc;
}, {});



export const geAuthorWithTopic = (topic = null) => {
    let _data = groupedByTopicAndAuthor;

    if (topic) {
        _data = _data[topic]
    }
    return _data;
};

export const groupedByYearAndTopicCountCommentFilterByTopic  = (topic) => (allData.filter(item => item.topic.includes(topic))).reduce((acc, entry) => {

    if (entry.date !== null && entry.date !== "null" && entry.date !== "") {
        const year = entry.date.split("/")[2]; // Extract the year from the date
        acc[year] = acc[year] || {};
        // acc[year][entry.topic] = (acc[year][entry.topic] || 0) + 1;

        // Initialize counts for all topics to zero
        getUniqueAuthors.forEach((topic) => {
            acc[year][topic] = acc[year][topic] || 0;
        });

        const commentCount = parseInt(entry.comment, 10);

        if (!isNaN(commentCount)) {
            acc[year][entry.topic] = (acc[year][entry.topic] || 0) + commentCount;
        }
    }
    return acc;
}, {});

export const groupedByYearAndAuthorFilterByTopic  = (topic) => (allData.filter(item => item.topic.includes(topic))).reduce((acc, entry) => {

    if (entry.date !== null && entry.date !== "null" && entry.date !== "") {
        const year = entry.date.split("/")[2]; // Extract the year from the date
        acc[year] = acc[year] || {};
        // acc[year][entry.topic] = (acc[year][entry.topic] || 0) + 1;

        // Initialize counts for all topics to zero
        getUniqueAuthors.forEach((author) => {
            acc[year][author] = acc[year][author] || 0;
        });

        acc[year][entry.formatedAuthorName] += parseInt(entry.comment, 10);
    }
    return acc;
}, {});

// Find the Topic with the most comments
export const mostCommentedTopic = () => {
    const TopicCommentCounts = geTopicWithCommentCount;
    const hasEntries = Object.keys(TopicCommentCounts).length > 0;

    if (hasEntries) {

        return Object.keys(TopicCommentCounts).reduce((a, b) =>
            TopicCommentCounts[a] > TopicCommentCounts[b] ? a : b
        )
    }

    return "-";
};
// Find the author with the most comments
export const mostCommentedAuthor = () => {
    const authorCommentCounts = geAuthorWithCommentCount;
    const hasEntries = Object.keys(authorCommentCounts).length > 0;

    if (hasEntries) {

        return Object.keys(authorCommentCounts).reduce((a, b) =>
            authorCommentCounts[a] > authorCommentCounts[b] ? a : b
        )
    }

    return "-";
};


export const preloadDataToLocalStorage = () => {

    const rawData = JSON.parse(localStorage.getItem("ScarpedData"));
    const _getTotalComments = getTotalComments();
    localStorage.setItem("getTotalComments",_getTotalComments);
    
    const _getTotalRecords = getTotalRecords();
    localStorage.setItem("getTotalRecords",_getTotalRecords);

    const _mostCommentedTopic = mostCommentedTopic();
    localStorage.setItem("mostCommentedTopic", _mostCommentedTopic);
    
    const _mostCommentedAuthor = mostCommentedAuthor();
    localStorage.setItem("mostCommentedAuthor", _mostCommentedAuthor);
    
    const _getUniqueAuthors = getUniqueAuthors;
    localStorage.setItem("getUniqueAuthors", JSON.stringify(_getUniqueAuthors));
    
    const _getUniqueTopics = getUniqueTopics;
    localStorage.setItem("getUniqueTopics", JSON.stringify(_getUniqueTopics));
    
    const _groupedByYearAndTopic = groupedByYearAndTopic;
    localStorage.setItem("groupedByYearAndTopic", JSON.stringify(_groupedByYearAndTopic));
    
    const _groupedByYearAndTopicCountComment = groupedByYearAndTopicCountComment;
    localStorage.setItem("groupedByYearAndTopicCountComment", JSON.stringify(_groupedByYearAndTopicCountComment));
    
    const _groupedByYearAndAuthor = groupedByYearAndAuthor;
    localStorage.setItem("groupedByYearAndAuthor", JSON.stringify(_groupedByYearAndAuthor));
    
    // const _getAuthorWithCommentTotal = getAuthorWithCommentTotal(rawData);
    // localStorage.setItem("getAuthorWithCommentTotal", JSON.stringify(_getAuthorWithCommentTotal));
    
    const _geAuthorWithCommentCount = geAuthorWithCommentCount;
    localStorage.setItem("geAuthorWithCommentCount", JSON.stringify(_geAuthorWithCommentCount));
    
    const _geTopicWithCommentCount = geTopicWithCommentCount;
    localStorage.setItem("geTopicWithCommentCount", JSON.stringify(_geTopicWithCommentCount));
    
}

