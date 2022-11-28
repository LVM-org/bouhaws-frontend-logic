const documents = [];
function graphql(source) {
    return documents[source] ?? {};
}

function useFragment(_documentNode, fragmentType) {
    return fragmentType;
}

export { graphql, useFragment };
