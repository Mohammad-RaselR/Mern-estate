#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int N, M;
    cin >> N >> M;
    vector<vector<int>> tastiness(N, vector<int>(M));

    // Reading the tastiness values for each shop
    for (int i = 0; i < N; ++i) {
        for (int j = 0; j < M; ++j) {
            cin >> tastiness[i][j];
        }
    }

    int maxProduct = 0;

    // Iterate over all possible picks for Alice and Bob for each shop
    for (int alice = 0; alice < M; ++alice) {
        for (int bob = 0; bob < M; ++bob) {
            if (alice == bob) continue; // Alice and Bob must pick different sweets

            int aliceSum = 0, bobSum = 0;

            // Calculate the sum of tastiness values for Alice and Bob
            for (int i = 0; i < N; ++i) {
                aliceSum += tastiness[i][alice];
                bobSum += tastiness[i][bob];
            }

            // Calculate the product of the sums and update the maximum product
            int product = aliceSum * bobSum;
            maxProduct = max(maxProduct, product);
        }
    }

    // Print the maximum possible tastiness value of the combined treat
    cout << maxProduct << endl;

    return 0;
}
