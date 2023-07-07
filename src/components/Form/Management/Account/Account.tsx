'use client';

import React, { useEffect, useMemo } from 'react';
import { DataTable } from '@components/Common';
import { COLUMNS_ACCOUNT } from '@constants/data';
import { getAllUserAccount } from '@store/slices/accountSlice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getRole } from '@utils/index';

export const Account = () => {
    const dispatch = useAppDispatch();
    const { accounts } = useAppSelector((state) => state.account);

    useEffect(() => {
        dispatch(getAllUserAccount());
    }, []);

    const rows = useMemo(() => {
        return accounts.map((account, i) => ({
            id: account._id,
            no: i + 1,
            name: `${account.firstName} ${account.lastName}`,
            role: getRole(account.role),
            email: account.email,
        }));
    }, [accounts]);

    return (
        <>
            <DataTable column={COLUMNS_ACCOUNT} row={rows} />
        </>
    );
};
