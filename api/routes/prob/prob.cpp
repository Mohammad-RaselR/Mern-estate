#include<bits/stdc++.h>
using namespace std;
#define ll long long
const ll MAXN = 1e5 + 10;

vector<ll> tree[MAXN];
ll values[MAXN];
vector<ll> path[MAXN];

void dfs(ll node, ll parent, vector<ll> &currentPath) {
    currentPath.push_back(values[node]);
    path[node] = currentPath; 

    for (ll neighbor : tree[node]) {
        if (neighbor == parent) continue;
        dfs(neighbor, node, currentPath);
    }

    currentPath.pop_back();
}

int main() {
    ll n, q;
    cin >> n >> q;

    for (ll i = 1; i <= n; ++i) {
        cin >> values[i];
    }

    for (ll i = 0; i < n - 1; ++i) {
        ll u, v;
        cin >> u >> v;
        tree[u].push_back(v);
        tree[v].push_back(u);
    }

    vector<ll> currentPath;
    dfs(1, -1, currentPath);

    while (q--) {
        ll x, k;
        cin >> x >> k;

        vector<ll> pathValues = path[x];
        sort(pathValues.begin(), pathValues.end());

        if (k > static_cast<long long>(pathValues.size())) {
            cout << -1 << endl;
        } else {
            cout << pathValues[k - 1] << endl;
        }
    }

    return 0;
}
