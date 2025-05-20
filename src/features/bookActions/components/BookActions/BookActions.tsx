import {Button, Tooltip, Text} from '@gravity-ui/uikit';
import {BookStatus} from '@/shared/api/book';
import block from 'bem-cn-lite';
import './BookActions.scss';

const b = block('bookActions');

interface BookActionsProps {
    status: BookStatus;
    handleReserve: () => void;
    handleCancelReservation: () => void;
}

export const BookActions = ({
    status,
    handleReserve,
    handleCancelReservation,
}: BookActionsProps) => (
    <div className={b()}>
        <div className={b('rentButton')}>
            <Tooltip
                content={
                    <Text variant="body-2">Книгу необходимо забрать в течение 3 дней</Text>
                }
                placement="top"
                openDelay={100}
            >
                <Button
                    view="action"
                    size="xl"
                    onClick={handleReserve}
                    disabled={status !== BookStatus.AVAILABLE}
                >
                    Забронировать
                </Button>
            </Tooltip>
            {status === BookStatus.BOOKED && (
                <Button
                    view="action"
                    size="xl"
                    onClick={handleCancelReservation}
                >
                    Отменить бронь
                </Button>
            )}
        </div>

        <Text className={b('infoText')} variant="body-2" color="hint">
            Забронируйте книгу и заберите её из библиотеки в течение трёх дней. Она будет доступна
            для домашнего чтения на 30 дней, после чего её необходимо вернуть обратно в библиотеку.
        </Text>
    </div>
);

export default BookActions;
