import { useState, useMemo } from 'react';
import {
    Search,
    FileText,
    Download,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Filter,
    ArrowUpDown,
    ArrowUp,
    ArrowDown
} from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Button from './Button';

/**
 * A premium DataTable component with filtering, pagination, and export capabilities.
 * 
 * @param {Object} props
 * @param {Array} props.columns - Array of column definitions { header, accessor, render, sortable }
 * @param {Array} props.data - The data to display
 * @param {string} props.title - Optional title for the table
 * @param {string} props.exportFileName - Name for exported files
 */
export default function DataTable({
    columns,
    data = [],
    title = "",
    exportFileName = "export",
    searchPlaceholder = "Rechercher..."
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Handle Sorting
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Filter and Sort Data
    const filteredAndSortedData = useMemo(() => {
        let result = [...data];

        // Filtering
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(item => {
                return columns.some(col => {
                    const value = col.accessor ? item[col.accessor] : null;
                    if (value === null || value === undefined) return false;
                    return String(value).toLowerCase().includes(lowerSearch);
                });
            });
        }

        // Sorting
        if (sortConfig.key) {
            result.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [data, searchTerm, sortConfig, columns]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
    const paginatedData = filteredAndSortedData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Export to Excel
    const exportToExcel = () => {
        const exportData = filteredAndSortedData.map(item => {
            const row = {};
            columns.forEach(col => {
                if (col.header && col.accessor) {
                    row[col.header] = item[col.accessor];
                }
            });
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, `${exportFileName}.xlsx`);
    };

    // Export to PDF
    const exportToPDF = () => {
        const doc = new jsPDF();

        const tableColumn = columns.filter(col => col.accessor).map(col => col.header);
        const tableRows = filteredAndSortedData.map(item => {
            return columns.filter(col => col.accessor).map(col => {
                const val = item[col.accessor];
                return val !== undefined && val !== null ? String(val) : "";
            });
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [249, 115, 22], textColor: [255, 255, 255] }
        });

        doc.text(title || "Rapport", 14, 15);
        doc.save(`${exportFileName}.pdf`);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Table Header / Toolbar */}
            <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
                        <button
                            onClick={exportToExcel}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-all"
                            title="Exporter en Excel"
                        >
                            <Download size={14} />
                            <span className="hidden sm:inline">Excel</span>
                        </button>
                        <div className="w-px h-4 bg-gray-200 mx-1"></div>
                        <button
                            onClick={exportToPDF}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                            title="Exporter en PDF"
                        >
                            <FileText size={14} />
                            <span className="hidden sm:inline">PDF</span>
                        </button>
                    </div>

                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="bg-white border border-gray-200 text-gray-600 text-xs rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                        {[5, 10, 20, 50, 100].map(size => (
                            <option key={size} value={size}>
                                {size} par page
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={`p-4 font-semibold text-gray-700 ${col.className || ''}`}
                                    onClick={() => col.sortable && handleSort(col.accessor)}
                                >
                                    <div className={`flex items-center gap-2 ${col.sortable ? 'cursor-pointer hover:text-primary transition-colors' : ''} ${col.headerClassName || ''}`}>
                                        {col.header}
                                        {col.sortable && (
                                            <span className="text-gray-400">
                                                {sortConfig.key === col.accessor ? (
                                                    sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                                                ) : <ArrowUpDown size={14} className="opacity-30" />}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, rowIndex) => (
                                <tr key={item.id || rowIndex} className="hover:bg-gray-50/80 transition-colors group">
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className={`p-4 ${col.className || ''}`}>
                                            {col.render ? col.render(item) : (col.accessor ? item[col.accessor] : null)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="p-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <Filter size={40} className="text-gray-200" />
                                        <p className="font-medium">Aucun résultat trouvé</p>
                                        <p className="text-xs">Essayez d'ajuster vos filtres ou votre recherche.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <p className="text-xs text-gray-500">
                        Affichage de <span className="font-semibold text-gray-900">{((currentPage - 1) * pageSize) + 1}</span> à <span className="font-semibold text-gray-900">{Math.min(currentPage * pageSize, filteredAndSortedData.length)}</span> sur <span className="font-semibold text-gray-900">{filteredAndSortedData.length}</span> résultats
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="p-1 text-gray-400 hover:text-primary disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                        >
                            <ChevronsLeft size={18} />
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="p-1 text-gray-400 hover:text-primary disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <div className="flex items-center gap-1 mx-2">
                            {/* Simple pagination logic for showing few numbers */}
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`w-8 h-8 text-xs font-bold rounded-lg transition-all ${currentPage === pageNum ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-gray-500 hover:bg-gray-100'}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="p-1 text-gray-400 hover:text-primary disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="p-1 text-gray-400 hover:text-primary disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                        >
                            <ChevronsRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
