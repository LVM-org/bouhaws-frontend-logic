'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const documents = [];
function graphql(source) {
    return documents[source] ?? {};
}

function useFragment(_documentNode, fragmentType) {
    return fragmentType;
}

exports.graphql = graphql;
exports.useFragment = useFragment;
