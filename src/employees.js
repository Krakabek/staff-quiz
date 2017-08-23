export const Employees = [
    {name: "Danil Radkovsky", pic: "dradkovsky"},
    {name: "Alexandr Rodik", pic: "arodik"},
    {name: "Anton Derenivsky", pic: "aderenivsky"},
    {name: "Anna Shevchenko", pic: "ashevchenko"},
    {name: "Oleksandr Karpov", pic: "akarpov"}
];

export function randomInRange(B, A = 0) {
    return Math.floor(Math.random() * (B - A) + A);
}

function randomIndex(exclude = []) {
    let foundCandidate = false;
    while (!foundCandidate) {
        let candidate = randomInRange(Employees.length);
        if (exclude.indexOf(candidate) === -1) {
            foundCandidate = true;
            return candidate;
        }
    }
}

export function getRandomEmployees(quantity = 3) {
    const index1 = randomIndex();
    const index2 = randomIndex([index1]);
    const index3 = randomIndex([index1, index2]);
    return [
        Employees[index1],
        Employees[index2],
        Employees[index3]
    ];
}
