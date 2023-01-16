import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Index(props) {
    const { data: peoples, meta } = props.users;
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
                                        {peoples.length &&
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
                                            ))}
                                    </tbody>
                                </table>
                                {/* pagination */}
                                <div className="flex items-center mt-10">
                                    {meta.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            disabled={
                                                link.url == null ? true : false
                                            }
                                            as="button"
                                            className={`${
                                                link.url == null
                                                    ? "text-gray-500 bg-gray-100"
                                                    : "text-gray-900  bg-gray-50"
                                            } rounded-md flex items-center justify-center border border-gray-200 px-4 py-2`}
                                            href={link.url || ""}
                                        >
                                            {link.label}
                                        </Link>
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
