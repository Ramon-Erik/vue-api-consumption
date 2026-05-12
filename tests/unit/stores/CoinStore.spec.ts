import { coinApi } from "@/services/api";
import { useCoin } from "@/stores/CoinStore";
import { createPinia, setActivePinia } from "pinia";

jest.mock("@/services/api", () => ({
  coinApi: {
    get: jest.fn(),
  },
}));

const mockedCoinApi = coinApi as jest.Mocked<typeof coinApi>;

describe("useCoin", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    jest.clearAllMocks();
  });

  it("latestPrices should start with an empty array", () => {
    const store = useCoin();

    expect(store.latestPrices.length).toBe(0);
  });

  it("should set value of latestPrices to an array of number tuples", async () => {
    const store = useCoin();

    const mockedData = {
      data: {
        prices: [
          [1778428846028, 400040.959521484],
          [1778432448799, 399642.323101596],
          [1778436033629, 400228.985148019],
        ],
      },
    };
    mockedCoinApi.get.mockResolvedValue(mockedData);

    await store.updateCoinInfo("bitcoin");

    expect(mockedCoinApi.get).toBeCalledTimes(1);
  });

  it("should throw an error on invalid ids", async () => {
    const store = useCoin();

    mockedCoinApi.get.mockRejectedValue({
      response: { status: 404 },
    });
    await store.updateCoinInfo("invalidId");

    expect(store.latestPrices.length).toBe(0);
    expect(mockedCoinApi.get).toBeCalledTimes(1);
  });
});
