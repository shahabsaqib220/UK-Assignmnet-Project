import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Topbar from './TopBar';
import AdminitratorNavbar from './AdministratorNavbar';

const OrdersTable = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingOrderId, setLoadingOrderId] = useState(null); // State to track the loading order ID
    const [processingAction, setProcessingAction] = useState(null); // State to track processing action

    // Fetch orders from MongoDB
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://uk-assignmnet-project.vercel.app/api/payments/allpendingpayment');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Function to handle payment approval or decline
    const handlePaymentAction = async (orderId, isApproved, action) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to mark this payment as ${isApproved ? 'approved' : 'declined'}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, proceed!',
            cancelButtonText: 'No, cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoadingOrderId(orderId); // Set loading state for the specific order
                setProcessingAction(isApproved ? 'approve' : 'decline'); // Set processing action
                try {
                    // Call the API only when the "Yes" button is confirmed
                    const response = await fetch(`https://uk-assignmnet-project.vercel.app/api/paymentstatus/${action}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ orderId, isPaymentApproved: isApproved }),
                    });

                    if (response.ok) {
                        Swal.fire(
                            'Updated!',
                            `The payment has been marked as ${isApproved ? 'approved' : 'declined'}.`,
                            'success'
                        );
                        // Reload the page to reflect the changes
                        window.location.reload();
                    } else {
                        Swal.fire('Error', 'Something went wrong!', 'error');
                    }
                } catch (error) {
                    console.error("Error updating payment status: ", error);
                    Swal.fire('Error', 'Something went wrong!', 'error');
                } finally {
                    setLoadingOrderId(null); // Reset loading state
                    setProcessingAction(null); // Reset processing action
                }
            } else {
                // Reset processing action if canceled
                setProcessingAction(null);
            }
        });
    };

    const handleDownload = async (orderId, fileType) => {
        try {
            const response = await fetch(`https://uk-assignmnet-project.vercel.app/api/uploads/download/${orderId}/${fileType}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch file URL: ${response.statusText}`);
            }
            const data = await response.json();
            const { fileUrl } = data;

            if (fileUrl) {
                const a = document.createElement('a');
                a.href = fileUrl;
                a.target = '_blank';
                a.download = fileType;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                console.error('No file URL returned');
            }
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <>
            <Topbar />
            <AdminitratorNavbar />
            <div className="container mx-auto mt-10">
                <h2 className="text-2xl font-semibold mb-5">Pending Payments</h2>
                <p className="bg-yellow-100 text-yellow-800 border border-yellow-300 font-semibold rounded-lg p-4 mb-6">
    <strong className="font-semibold">Note:</strong> Only those students who have their payment approved will receive the Order ID. Students with declined payments will not receive the Order ID. (Email Notification).
</p>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="animate-pulse">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead >
                                    <tr>
                                        <th className="py-2 px-4 border-b"><Skeleton /></th>
                                        <th className="py-2 px-4 border-b"><Skeleton /></th>
                                        <th className="py-2 px-4 border-b"><Skeleton /></th>
                                        <th className="py-2 px-4 border-b"><Skeleton /></th>
                                        <th className="py-2 px-4 border-b"><Skeleton /></th>
                                        <th className="py-2 px-4 border-b"><Skeleton /></th>
                                        <th className="py-2 px-4 border-b"><Skeleton /></th>
                                        <th className="py-2 px-4 border-b"><Skeleton /></th>
                                        <th className="py-2 px-4 border-b"><Skeleton /></th>
                                        <th className="py-2 px-4 border-b"><Skeleton /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(5)].map((_, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border-b"><Skeleton /></td>
                                            <td className="py-2 px-4 border-b"><Skeleton /></td>
                                            <td className="py-2 px-4 border-b"><Skeleton /></td>
                                            <td className="py-2 px-4 border-b"><Skeleton /></td>
                                            <td className="py-2 px-4 border-b"><Skeleton /></td>
                                            <td className="py-2 px-4 border-b"><Skeleton /></td>
                                            <td className="py-2 px-4 border-b"><Skeleton /></td>
                                            <td className="py-2 px-4 border-b"><Skeleton /></td>
                                            <td className="py-2 px-4 border-b"><Skeleton /></td>
                                            <td className="py-2 px-4 border-b"><Skeleton /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : orders.length === 0 ? (
                        <p className="text-center py-5">No Pending Payments are available right now.</p>
                    ) : (
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className='bg-yellow-100'>
                                <tr>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Email</th>
                                    <th className="py-2 px-4 border-b">Phone</th>
                                    <th className="py-2 px-4 border-b">Academic Level</th>
                                    <th className="py-2 px-4 border-b">Deadline</th>
                                    <th className="py-2 px-4 border-b">Word Count</th>
                                    <th className="py-2 px-4 border-b">Paper Type</th>
                                    <th className="py-2 px-4 border-b">Order ID</th>
                                    <th className="py-2 px-4 border-b">Payment Receipt</th>
                                    <th className="py-2 px-4 border-b">Is Payment Approved</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.orderId}>
                                        <td className="py-2 px-4 border-b">{order.name}</td>
                                        <td className="py-2 px-4 border-b">{order.email}</td>
                                        <td className="py-2 px-4 border-b">{order.phone}</td>
                                        <td className="py-2 px-4 border-b">{order.academicLevel}</td>
                                        <td className="py-2 px-4 border-b">{order.deadline}</td>
                                        <td className="py-2 px-4 border-b">{order.wordCount}</td>
                                        <td className="py-2 px-4 border-b">{order.paperType}</td>
                                        <td className="py-2 px-4 border-b">{order.orderId}</td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                onClick={() => handleDownload(order.orderId, "paymentReceipt")}
                                                className="bg-green-500 hover:bg-green-700 text-white font-moseo font-bold py-1 px-2 rounded whitespace-nowrap"
                                                style={{ minWidth: '160px' }}
                                            >
                                                View Payment Receipt
                                            </button>
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handlePaymentAction(order.orderId, true, 'approvepayment')}
                                                    className={`bg-green-500 text-white font-moseo font-bold py-1 px-2 rounded ${loadingOrderId === order.orderId && processingAction === 'approve' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    disabled={loadingOrderId !== null && processingAction !== null}
                                                >
                                                    {loadingOrderId === order.orderId && processingAction === 'approve' ? 'Processing...' : 'Approve'}
                                                </button>
                                                <button
                                                    onClick={() => handlePaymentAction(order.orderId, false, 'declinepayment')}
                                                    className={`bg-red-500 text-white font-moseo font-bold py-1 px-2 rounded ${loadingOrderId === order.orderId && processingAction === 'decline' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    disabled={loadingOrderId !== null && processingAction !== null}
                                                >
                                                    {loadingOrderId === order.orderId && processingAction === 'decline' ? 'Processing...' : 'Decline'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrdersTable;
