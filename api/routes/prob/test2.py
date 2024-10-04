from collections import defaultdict
import bisect

class TreeQuery:
    def __init__(self, n, values, edges):
        self.n = n
        self.values = values
        self.graph = defaultdict(list)
        for u, v in edges:
            self.graph[u].append(v)
            self.graph[v].append(u)
        
        # DFS and Euler tour initialization
        self.euler = []
        self.first_occurrence = [-1] * (n + 1)
        self.depth = [0] * (n + 1)
        self.euler_tour(1, -1)
        
        # Segment Tree initialization for sorted values along paths
        self.seg_tree = [[] for _ in range(2 * n)]
        self.build_segment_tree(1, 0, len(self.euler) - 1)
        
    def euler_tour(self, node, parent):
        self.first_occurrence[node] = len(self.euler)
        self.euler.append((self.depth[node], self.values[node]))
        for neighbor in self.graph[node]:
            if neighbor == parent:
                continue
            self.depth[neighbor] = self.depth[node] + 1
            self.euler_tour(neighbor, node)
            self.euler.append((self.depth[node], self.values[node]))

    def build_segment_tree(self, pos, l, r):
        if l == r:
            self.seg_tree[pos] = [self.euler[l][1]]
            return
        mid = (l + r) // 2
        self.build_segment_tree(2 * pos, l, mid)
        self.build_segment_tree(2 * pos + 1, mid + 1, r)
        self.seg_tree[pos] = sorted(self.seg_tree[2 * pos] + self.seg_tree[2 * pos + 1])

    def query_segment_tree(self, pos, l, r, ql, qr, k):
        if l > qr or r < ql:
            return []
        if ql <= l and r <= qr:
            return self.seg_tree[pos]
        mid = (l + r) // 2
        left = self.query_segment_tree(2 * pos, l, mid, ql, qr, k)
        right = self.query_segment_tree(2 * pos + 1, mid + 1, r, ql, qr, k)
        return sorted(left + right)

    def query(self, x, k):
        l = self.first_occurrence[x]
        r = self.first_occurrence[x]
        # Get all values in the path of the tree
        result = self.query_segment_tree(1, 0, len(self.euler) - 1, l, r, k)
        if len(result) < k:
            return -1
        return result[k - 1]

# Reading input
n, q = map(int, input().split())
values = [0] + list(map(int, input().split())) # node values, indexed from 1
edges = [tuple(map(int, input().split())) for _ in range(n - 1)]

# Create tree query object
tree_query = TreeQuery(n, values, edges)

# Answer each query
for _ in range(q):
    x, k = map(int, input().split())
    print(tree_query.query(x, k))
