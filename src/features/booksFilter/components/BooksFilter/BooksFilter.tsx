import {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Icon, Text, TextInput} from '@gravity-ui/uikit';
import {Magnifier} from '@gravity-ui/icons';
import {setQuery, setGenres, resetFilters} from '../../model/slice';
import {getQuery, getGenresFilter} from '../../model/slice';
import GenreFilter from '../GenreFilter/GenreFilter';

import block from 'bem-cn-lite';
import './BooksFilter.scss';
const b = block('booksFilter');

export interface BooksFilterProps {
    onConfirm: (filters: {query?: string; genreIds?: number[]}) => void;
}

export const BooksFilter = ({onConfirm}: BooksFilterProps) => {
    const dispatch = useDispatch();

    const query = useSelector(getQuery);
    const genres = useSelector(getGenresFilter);
    const [queryLocal, setQueryLocal] = useState(query ?? '');

    const [genresLocal, setGenresLocal] = useState(genres);

    const handleConfirm = useCallback(() => {
        dispatch(setQuery(queryLocal));
        dispatch(setGenres(genresLocal));

        onConfirm({query: queryLocal, genreIds: genresLocal});
    }, [queryLocal, genresLocal, dispatch, onConfirm]);

    const handleReset = useCallback(() => {
        setQueryLocal('');
        setGenresLocal([]);
        dispatch(resetFilters());
    }, [dispatch]);

    return (
        <div className={b()}>
            <Text variant="display-2">Каталог книг</Text>
            <div className={b('filters')}>
                <div>
                    <Text>Поиск</Text>
                    <TextInput
                        startContent={<Icon data={Magnifier} />}
                        value={queryLocal}
                        onChange={(e) => setQueryLocal(e.target.value)}
                        hasClear
                    />
                </div>
                <div>
                    <Text>Жанры</Text>
                    <div className={b('genres_container')}>
                        <GenreFilter selectedGenres={genresLocal} onChange={setGenresLocal} />
                    </div>
                </div>

                <Button onClick={handleConfirm} view="action" type="submit">
                    применить
                </Button>
                <Button onClick={handleReset} view="action" type="reset">
                    сбросить
                </Button>
            </div>
        </div>
    );
};

export default BooksFilter;
