import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useGetProductsQuery,
  useSyncShopifyMutation,
} from '@/slices/productsApiSlice';
import { useSelector } from 'react-redux';
import LoadingSpinner from '@/components/ui/LoadinSpinner';

export type Products = {
  id: string;
  name: string;
  description: string;
  brand: string;
  image: string;
  status: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div
          className='flex items-center gap-1 cursor-pointer'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <img
          src={row.original.image}
          alt='Row Image'
          style={{ width: 50, height: 50, borderRadius: '10px' }}
        />
        <div className='capitalize'>{row.getValue('name')}</div>
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: () => {
      return <div>Description</div>;
    },
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue('description')}</div>
    ),
  },
  {
    accessorKey: 'brand',
    header: () => {
      return <div>Brand</div>;
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('brand')}</div>,
  },
  {
    accessorKey: 'category',
    header: () => {
      return <div>Category</div>;
    },
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue('category')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: () => {
      return <div>Status</div>;
    },
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue('status')}</div>
    ),
  },
];

function ProductTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { userInfo } = useSelector((state: any) => state.auth);
  const isAdmin = userInfo?.isAdmin;
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { data, isLoading, refetch } = useGetProductsQuery({});
  const [syncShopify, { isLoading: isLoadingSync, isSuccess }] =
    useSyncShopifyMutation();
  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  const handleSyncClick = async () => {
    try {
      const result = await syncShopify({}).unwrap();
    } catch (err) {
      console.error('Failed to sync:', err);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <h3 className='tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900 mb-10'>
          Products
        </h3>
        {isAdmin && (
          <Button onClick={handleSyncClick} disabled={isLoadingSync}>
            {isLoadingSync && <LoadingSpinner className='mr-2' />}
            Sync Product
          </Button>
        )}
      </div>
      <div className='w-full'>
        <div className='flex items-center py-4'>
          <Input
            placeholder='Search ...'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                Columns <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-end space-x-2 py-4'>
          <div className='space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductTable;
