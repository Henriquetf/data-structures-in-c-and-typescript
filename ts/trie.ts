const A = "a".charCodeAt(0);
const Z = "z".charCodeAt(0);
const alphabetSize = Z - A + 1;

interface TrieNode {
  isTerminal: boolean;
  children: TrieNode[];
  value: string | null;
}

export function makeNode(): TrieNode {
  return {
    isTerminal: false,
    children: new Array(alphabetSize),
    value: null,
  };
}

function getCharPos(char: string) {
  return char.toLowerCase().charCodeAt(0) - A;
}

export function insertTrie(trie: TrieNode, value: string) {
  let current = trie;

  for (let i = 0; i < value.length; i++) {
    const charPos = getCharPos(value[i]);

    if (current.children[charPos]) {
      current = current.children[charPos];
    } else {
      const node = makeNode();

      current.children[charPos] = node;
      current = node;
    }
  }

  current.value = value;
  current.isTerminal = true;
}
