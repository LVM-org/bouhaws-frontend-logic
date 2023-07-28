function useFragment(_documentNode, fragmentType) {
    return fragmentType;
}
function makeFragmentData(data, _fragment) {
    return data;
}

const documents = [];
function graphql(source) {
    return documents[source] ?? {};
}

export { graphql, makeFragmentData, useFragment };
