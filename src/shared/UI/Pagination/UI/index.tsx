import React, { useState, useEffect, useRef } from 'react'
import styles from './styles.module.scss'

interface Props {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
    maxVisiblePages?: number
    step?: number
    debounceTime?: number
}

const Pagination = ({
    totalPages,
    currentPage,
    onPageChange,
    maxVisiblePages = 10,
    step = 10,
    debounceTime = 200
}: Props) => {
    const [localPage, setLocalPage] = useState(currentPage)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        setLocalPage(currentPage)
    }, [currentPage])

    const getPageNumbers = () => {
        const pages = []
        const half = Math.floor(maxVisiblePages / 2)
        let start = Math.max(1, localPage - half)
        let end = Math.min(totalPages, localPage + half)

        if (localPage <= half) {
            end = Math.min(totalPages, maxVisiblePages)
        } else if (localPage + half >= totalPages) {
            start = Math.max(1, totalPages - maxVisiblePages + 1)
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (end < totalPages) {
            pages[pages.length - 1] = totalPages
            pages[pages.length - 2] = '...'
        }

        return pages
    }

    const handlePageChange = (page: number) => {
        setLocalPage(page)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            onPageChange(page)
        }, debounceTime)
    }

    return (
        <div className={styles.pagination}>
            <div className={styles.desktop}>
                <div className={styles.arrows}>
                    <button
                        className={styles.pageButton}
                        onClick={() => handlePageChange(Math.max(1, localPage - step))}
                        disabled={localPage <= step}
                    >
                        &lt;&lt;
                    </button>
                    <button
                        className={styles.pageButton}
                        onClick={() => handlePageChange(Math.max(1, localPage - 1))}
                        disabled={localPage === 1}
                    >
                        &lt;
                    </button>
                    <div className={styles.pageNumbers}>
                        {getPageNumbers().map((page, index) => (
                            <button
                                key={index}
                                className={`${styles.pageButton} ${localPage === page ? styles.active : ''}`}
                                onClick={() =>
                                    typeof page === 'number'
                                        ? handlePageChange(page)
                                        : handlePageChange(totalPages)
                                }
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        className={styles.pageButton}
                        onClick={() => handlePageChange(Math.min(totalPages, localPage + 1))}
                        disabled={localPage === totalPages}
                    >
                        &gt;
                    </button>
                    <button
                        className={styles.pageButton}
                        onClick={() => handlePageChange(Math.min(totalPages, localPage + step))}
                        disabled={localPage + step > totalPages}
                    >
                        &gt;&gt;
                    </button>
                </div>
            </div>
            <div className={styles.mobile}>
                <div className={styles.arrows}>
                    <div className={styles.part}>
                        <button
                            className={styles.pageButton}
                            onClick={() => handlePageChange(Math.max(1, localPage - step))}
                            disabled={localPage <= step}
                        >
                            &lt;&lt;
                        </button>
                        <button
                            className={styles.pageButton}
                            onClick={() => handlePageChange(Math.max(1, localPage - 1))}
                            disabled={localPage === 1}
                        >
                            &lt;
                        </button>
                    </div>
                    <div className={styles.part}>
                        <button
                            className={styles.pageButton}
                            onClick={() => handlePageChange(Math.min(totalPages, localPage + 1))}
                            disabled={localPage === totalPages}
                        >
                            &gt;
                        </button>
                        <button
                            className={styles.pageButton}
                            onClick={() => handlePageChange(Math.min(totalPages, localPage + step))}
                            disabled={localPage + step > totalPages}
                        >
                            &gt;&gt;
                        </button>
                    </div>
                </div>
                <div className={styles.pageNumbers}>
                    {getPageNumbers().map((page, index) => (
                        <button
                            key={index}
                            className={`${styles.pageButton} ${localPage === page ? styles.active : ''}`}
                            onClick={() =>
                                typeof page === 'number'
                                    ? handlePageChange(page)
                                    : handlePageChange(totalPages)
                            }
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Pagination
