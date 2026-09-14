"use client";

import { create } from "zustand";

const normalizePositiveInteger = (value) => {
    const number = Number(value);

    return Number.isFinite(number) ? Math.max(1, Math.floor(number)) : 1;
};

const getRandomNumber = (upperRange, randomType) => {
    if (
        randomType === "crypto" &&
        globalThis.crypto &&
        typeof globalThis.crypto.getRandomValues === "function"
    ) {
        const array = new Uint32Array(1);
        globalThis.crypto.getRandomValues(array);
        return (array[0] % upperRange) + 1;
    }

    return Math.floor(Math.random() * upperRange) + 1;
};

const generateResults = (upperRange, times, randomType) => {
    const numberRange = Array(upperRange + 1).fill(0);

    for (let i = 0; i < times; i++) {
        const number = getRandomNumber(upperRange, randomType);
        numberRange[number]++;
    }

    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    let minIdx = -1;
    let maxIdx = -1;

    for (let i = 1; i <= upperRange; i++) {
        if (numberRange[i] < min) {
            min = numberRange[i];
            minIdx = i;
        }
        if (numberRange[i] > max) {
            max = numberRange[i];
            maxIdx = i;
        }
    }

    const list = [];
    const chartData = [];
    const chartLabels = [];
    const chartColors = [];

    for (let i = 1; i <= upperRange; i++) {
        const percent = ((numberRange[i] / times) * 100).toFixed(2);
        list.push(
            `The number ${i} has appeared ${numberRange[i]} times (${percent}%)`,
        );
        chartData.push(numberRange[i]);
        chartLabels.push(`Number ${i}`);
        chartColors.push(`hsl(${Math.floor(Math.random() * 360)} 70% 50%)`);
    }

    list.push("\u00A0");
    list.push(
        `\nMost frequent: Number ${maxIdx} (${max} times)`,
        `Least frequent: Number ${minIdx} (${min} times)`,
        `Largest range (max-min): ${max - min}`,
    );

    return {
        numberRange,
        list,
        chartData,
        chartLabels,
        chartColors,
    };
};

const useStore = create((set) => ({
    upperRange: 10,
    times: 100,
    randomType: "math",
    numberRange: [],
    list: [],
    chartData: [],
    chartLabels: [],
    chartColors: [],
    aboutOpen: false,

    setUpperRange: (value) =>
        set((state) => {
            const upperRange = normalizePositiveInteger(value);

            return {
                upperRange,
                ...generateResults(upperRange, state.times, state.randomType),
            };
        }),
    setTimes: (value) =>
        set((state) => {
            const times = normalizePositiveInteger(value);

            return {
                times,
                ...generateResults(state.upperRange, times, state.randomType),
            };
        }),
    setRandomType: (value) =>
        set((state) => ({
            randomType: value,
            ...generateResults(state.upperRange, state.times, value),
        })),
    setAboutOpen: (open) => set({ aboutOpen: open }),

    generate: () =>
        set((state) =>
            generateResults(state.upperRange, state.times, state.randomType),
        ),

}));

export default useStore;
