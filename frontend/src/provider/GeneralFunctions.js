import { saveAllData } from '../common/save_json'

export const getTotalComments = (data) => data.reduce((sum, item) => sum + parseInt(item.comment, 10), 0);
export const getTotalRecords = (data) => data.length;
export const getUniqueAuthors = (data) => [...new Set(data.map(item => item.formatedAuthorName))];
export const getUniqueTopics = (data) => [...new Set(data.map(item => item.topic))];

export const getTotalRecordByTopics = (data, topic) => (data.filter(item => item.topic.includes(topic))).length;
export const getTotalCommentsByTopics = (data, topic) => (data.filter(item => item.topic.includes(topic))).reduce((sum, item) => sum + parseInt(item.comment, 10), 0);
export const getUniqueAuthorsByTopics = (data, topic) => [...new Set((data.filter(item => item.topic.includes(topic))).map(item => item.formatedAuthorName))];
export const getUniqueTopicsByTopics = (data, topic) => [...new Set((data.filter(item => item.topic.includes(topic))).map(item => item.topic))];



// // Sort the data by formatedDate in descending order
// export const getSortPostsByYear = (data) => data.sort((a, b) => new Date(b.formatedDate) - new Date(a.formatedDate));





export const groupedByYearAndTopic = (data, allTopics) => data.reduce((acc, entry) => {

    if (entry.date !== null && entry.date !== "null" && entry.date !== "") {
        const year = entry.date.split("/")[2]; // Extract the year from the date
        acc[year] = acc[year] || {};
        // acc[year][entry.topic] = (acc[year][entry.topic] || 0) + 1;

        // Initialize counts for all topics to zero
        allTopics.forEach((topic) => {
            acc[year][topic] = acc[year][topic] || 0;
        });

        acc[year][entry.topic] += 1;
    }
    return acc;
}, {});


export const groupedByYearAndTopicCountComment = (data, allTopics) => data.reduce((acc, entry) => {

    if (entry.date !== null && entry.date !== "null" && entry.date !== "") {
        const year = entry.date.split("/")[2]; // Extract the year from the date
        acc[year] = acc[year] || {};
        // acc[year][entry.topic] = (acc[year][entry.topic] || 0) + 1;

        // Initialize counts for all topics to zero
        allTopics.forEach((topic) => {
            acc[year][topic] = acc[year][topic] || 0;
        });

        const commentCount = parseInt(entry.comment, 10);

        if (!isNaN(commentCount)) {
            acc[year][entry.topic] = (acc[year][entry.topic] || 0) + commentCount;
        }
    }
    return acc;
}, {});

export const groupedByYearAndAuthor = (data, allAuthor) => data.reduce((acc, entry) => {

    if (entry.date !== null && entry.date !== "null" && entry.date !== "") {
        const year = entry.date.split("/")[2]; // Extract the year from the date
        acc[year] = acc[year] || {};
        // acc[year][entry.topic] = (acc[year][entry.topic] || 0) + 1;

        // Initialize counts for all topics to zero
        allAuthor.forEach((author) => {
            acc[year][author] = acc[year][author] || 0;
        });

        acc[year][entry.formatedAuthorName] += parseInt(entry.comment, 10);
    }
    return acc;
}, {});

export const groupedByTopicAndAuthor = (data, allAuthor) => data.reduce((acc, entry) => {

    const _i_ = entry.topic;
    acc[_i_] = acc[_i_] || {};
    // acc[_i_][entry.topic] = (acc[_i_][entry.topic] || 0) + 1;

    // Initialize counts for all topics to zero
    allAuthor.forEach((author) => {
        acc[_i_][author] = acc[_i_][author] || 0;
    });

    acc[_i_][entry.formatedAuthorName] += parseInt(entry.comment, 10);

    return acc;
}, {});

export const getDate = (dateString) => {
    if (dateString !== null && dateString !== "null" && dateString !== "") {
        const parts = dateString.split('/');
        const year = parseInt(parts[2], 10);
        const month = parseInt(parts[0], 10) - 1; // Months are zero-indexed
        const day = parseInt(parts[1], 10);
        return new Date(year, month, day);
    }

    return null;
}

// export const getAuthorWithCommentTotal = async (data) => {
//     const groupedData = {};

//     // Iterate through the data and update comment counts for each author
//     await Promise.all(data.forEach((entry) => {
//         const author = entry.formatedAuthorName;
//         const commentCount = parseInt(entry.comment, 10);
//         if (!isNaN(commentCount)) {
//             groupedData[author] = (groupedData[author] || 0) + commentCount;
//         }
//     }));

//     return groupedData;
// };

// export const getAuthorWithCommentTotal = (data) => {
//     const groupedData = data.reduce((accumulator, entry) => {
//         const author = entry.formatedAuthorName;
//         const commentCount = parseInt(entry.comment, 10);

//         if (!isNaN(commentCount)) {
//             accumulator[author] = (accumulator[author] || 0) + commentCount;
//         }

//         return accumulator;
//     }, {});

//     const hasEntries = Object.keys(groupedData).length > 0;

//     if (hasEntries) {
//         return groupedData.reduce((a, b) =>
//             groupedData[a] > groupedData[b] ? a : b
//         )
//     }

//     return ""
// };


// export const groupedDataYearAndTopicFilteredByFromTo = (from, to) => {

//     const allTopics = getUniqueTopics(jsonData);

//     const groupedDataYearAndTopic = groupedByYearAndTopic(jsonData, allTopics);

//     return Object.entries(groupedDataYearAndTopic).filter((item) => {
//         const year = parseInt(item, 10);
//         return year >= from && year <= to;
//     })
// };


export const geTopicWithCommentCount = (data) => {
    const topicCommentCounts = {};

    data.forEach((entry) => {
        const topic = entry.topic;
        const commentCount = parseInt(entry.comment, 10);

        if (!isNaN(commentCount)) {
            topicCommentCounts[topic] = (topicCommentCounts[topic] || 0) + commentCount;
        }
    });
    return topicCommentCounts;
};

// Find the Topic with the most comments
export const mostCommentedTopic = (data) => {
    const TopicCommentCounts = geTopicWithCommentCount(data);
    const hasEntries = Object.keys(TopicCommentCounts).length > 0;

    if (hasEntries) {

        return Object.keys(TopicCommentCounts).reduce((a, b) =>
            TopicCommentCounts[a] > TopicCommentCounts[b] ? a : b
        )
    }

    return "-";
};


export const geAuthorWithCommentCount = (data, topic = null) => {
    const authorCommentCounts = {};
    let _data = data;

    if (topic) {
        _data = data.filter(item => item.topic.includes(topic))
    }
    _data.forEach((entry) => {
        const author = entry.formatedAuthorName;
        const commentCount = parseInt(entry.comment, 10);

        if (!isNaN(commentCount)) {
            authorCommentCounts[author] = (authorCommentCounts[author] || 0) + commentCount;
        }
    });
    return authorCommentCounts;
};


// Find the author with the most comments
export const mostCommentedAuthor = (data, topic = null) => {
    const authorCommentCounts = geAuthorWithCommentCount(data, topic);
    const hasEntries = Object.keys(authorCommentCounts).length > 0;

    if (hasEntries) {

        return Object.keys(authorCommentCounts).reduce((a, b) =>
            authorCommentCounts[a] > authorCommentCounts[b] ? a : b
        )
    }
    return "-";
};


export const preloadDataToLocalStorageSaveToJson = () => {
    const rawData = JSON.parse(localStorage.getItem("ScarpedData"));
    const _getUniqueAuthors = getUniqueAuthors(rawData);
    const _groupedByYearAndAuthor = groupedByTopicAndAuthor(rawData, _getUniqueAuthors);
    saveAllData(_groupedByYearAndAuthor, "groupedByTopicAndAuthor.json");
}


export const preloadDataToLocalStorage = () => {

    const rawData = JSON.parse(localStorage.getItem("ScarpedData"));
    const _getTotalComments = getTotalComments(rawData);
    localStorage.setItem("getTotalComments", _getTotalComments);

    const _getTotalRecords = getTotalRecords(rawData);
    localStorage.setItem("getTotalRecords", _getTotalRecords);

    const _mostCommentedTopic = mostCommentedTopic(rawData);
    localStorage.setItem("mostCommentedTopic", _mostCommentedTopic);

    const _mostCommentedAuthor = mostCommentedAuthor(rawData);
    localStorage.setItem("mostCommentedAuthor", _mostCommentedAuthor);

    const _getUniqueAuthors = getUniqueAuthors(rawData);
    localStorage.setItem("getUniqueAuthors", JSON.stringify(_getUniqueAuthors));

    const _getUniqueTopics = getUniqueTopics(rawData);
    localStorage.setItem("getUniqueTopics", JSON.stringify(_getUniqueTopics));

    const _groupedByYearAndTopic = groupedByYearAndTopic(rawData, _getUniqueTopics);
    localStorage.setItem("groupedByYearAndTopic", JSON.stringify(_groupedByYearAndTopic));

    const _groupedByYearAndTopicCountComment = groupedByYearAndTopicCountComment(rawData, _getUniqueTopics);
    localStorage.setItem("groupedByYearAndTopicCountComment", JSON.stringify(_groupedByYearAndTopicCountComment));

    const _groupedByYearAndAuthor = groupedByYearAndAuthor(rawData, _getUniqueAuthors);
    localStorage.setItem("groupedByYearAndAuthor", JSON.stringify(_groupedByYearAndAuthor));

    const _geAuthorWithCommentCount = geAuthorWithCommentCount(rawData);
    localStorage.setItem("geAuthorWithCommentCount", JSON.stringify(_geAuthorWithCommentCount));

    const _geTopicWithCommentCount = geTopicWithCommentCount(rawData);
    localStorage.setItem("geTopicWithCommentCount", JSON.stringify(_geTopicWithCommentCount));
}

