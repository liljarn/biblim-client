import { useGetAuthorsQuery } from '@/shared/api/author/api';
import { Pagination, TextInput, Text, Icon } from '@gravity-ui/uikit';
import { useState, useCallback } from 'react';
import './AuthorListPage.scss';
import { AuthorList } from '@/entities/author';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { Magnifier } from '@gravity-ui/icons';

const PAGE_SIZE = 20;

export const AuthorListPage = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const { data, isLoading } = useGetAuthorsQuery({ page: page - 1, query: debouncedSearchQuery });

    const handlePageChange = (value: number) => {
        setPage(value);
    };

    const handleSearchChange = useCallback((value: string) => {
        setSearchQuery(value);
        setPage(1);
    }, []);

    if (isLoading) {
        return <Text>Загрузка...</Text>;
    }

    return (
        <div className="author-list-page">
            <Text variant="display-2" className='author-list-page-title'>Каталог авторов</Text>
            <div className="author-list-page-search">
            <TextInput
                startContent={<Icon data={Magnifier} />}
                
                placeholder="Поиск авторов"
                value={searchQuery}
                onUpdate={handleSearchChange}
            />
            </div>
            
            {data && (
                <>
                    <AuthorList authors={data.authors} />
                    <Pagination
                        total={Math.ceil(data.total / PAGE_SIZE)}
                        page={page}
                        pageSize={PAGE_SIZE}
                        onUpdate={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}; 