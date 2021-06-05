export const getBackgroundColor = score => {
    switch (score) {
        case 'A': return 'green';
        case 'B': return 'yellow';
        case 'C': return 'orange';
        case 'D': return 'red';
        default: return 'gray';
    }
}