import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/inertia-react";
import { debounce, pickBy } from "lodash";
import { useCallback, useEffect, useState } from "react";

export default function Index(props) {
    const { data: peoples, meta, options } = props.users;
    const [params, setParams] = useState(options);

    const onChange = (e) =>
        setParams({ ...params, [e.target.name]: e.target.value });

    const reload = useCallback(
        debounce((query) => {
            Inertia.get(
                route("users.index"),
                { ...pickBy(query), page: query.search ? 1 : query.page },
                {
                    preserveState: true,
                }
            );
        }, 150),
        []
    );

    useEffect(() => reload(params), [params]);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users Listing
                </h2>
            }
        >
            <Head title="Users Listing" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex w-full justify-end px-3 gap-2">
                            <div className="mt-2 flex-col gap-3 w-1/6">
                                <label htmlFor="limit">Limit</label>
                                <select
                                    name="limit"
                                    id="limit"
                                    value={params.limit}
                                    onChange={onChange}
                                    className="rounded-md px-3 py-2 w-full form-select"
                                >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                            <div className="mt-2 flex-col gap-3 w-1/4">
                                <label htmlFor="limit">Search</label>
                                <input
                                    type={"text"}
                                    name="search"
                                    id="search"
                                    value={params.search}
                                    onChange={onChange}
                                    className="rounded-md px-3 py-2 w-full form-input"
                                ></input>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="overflow-x-auto p-3">
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-200">
                                        <tr>
                                            <th className="p-2">
                                                <div className="font-semibold text-left">
                                                    #
                                                </div>
                                            </th>
                                            <th className="p-2">
                                                <div className="font-semibold text-left">
                                                    Username
                                                </div>
                                            </th>
                                            <th className="p-2">
                                                <div className="font-semibold text-left">
                                                    Email
                                                </div>
                                            </th>
                                            <th className="p-2">
                                                <div className="font-semibold text-left">
                                                    Address
                                                </div>
                                            </th>
                                            <th className="p-2">
                                                <div className="font-semibold text-left">
                                                    Joined
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {peoples.length > 0 ? (
                                            peoples.map((user, index) => (
                                                <tr key={meta.from + index}>
                                                    <td className="p-3">
                                                        <div className="font-medium text-gray-800">
                                                            {meta.from + index}
                                                        </div>
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="font-medium text-gray-800">
                                                            {user.username}
                                                        </div>
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="text-left">
                                                            {user.email}
                                                        </div>
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="text-left font-medium text-green-500">
                                                            {user.address}
                                                        </div>
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="text-left">
                                                            {user.joined}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <div>Data Not Found</div>
                                        )}
                                    </tbody>
                                </table>
                                {/* pagination */}
                                <div className="flex items-center mt-10">
                                    {meta.links.map((link, index) => (
                                        // <Link
                                        //     key={index}
                                        //     disabled={
                                        //         link.url == null ? true : false
                                        //     }
                                        //     as="button"
                                        //     className={`${
                                        //         link.url == null
                                        //             ? "text-gray-500 bg-gray-100"
                                        //             : "text-gray-900  bg-gray-50"
                                        //     } rounded-md flex items-center justify-center border border-gray-200 px-4 py-2`}
                                        //     href={link.url || ""}
                                        // >
                                        //     {link.label}
                                        // </Link>
                                        <button
                                            disabled={
                                                link.url == null ? true : false
                                            }
                                            onClick={() =>
                                                setParams({
                                                    ...params,
                                                    page: new URL(
                                                        link.url
                                                    ).searchParams.get("page"),
                                                })
                                            }
                                            key={index}
                                            className={`${
                                                link.url == null
                                                    ? "text-gray-500 bg-gray-100"
                                                    : "text-gray-900  bg-gray-50"
                                            } rounded-md flex items-center justify-center border border-gray-200 px-4 py-2`}
                                            href={link.url || ""}
                                        >
                                            {link.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
