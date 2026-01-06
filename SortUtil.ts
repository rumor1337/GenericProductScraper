class SortUtil {

    // i <3 typescript
    public static sort(data: any[], direction: 'ascending' | 'descending') {
     
        switch(direction) {
            case 'ascending':
                return data.sort((a, b) => a.price - b.price);
            case 'descending':
                return data.sort((a, b) => b.price - a.price);
        }

    }

}

export default SortUtil;