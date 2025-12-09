import { Order } from "@/types/interfaces/order";

interface props {
    orderList: Order[];
}

export default function OrderList({ orderList }: props) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 p-2">
            {orderList.map((order, index) => (
                <div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                >
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg">Pedido #{index + 1}</h3>
                            <span className="px-3 py-1 bg-white/20 rounded-full font-semibold">
                                ID: {order.collaboratorId}
                            </span>
                        </div>
                        
                        <div className="mt-2">
                            <span className="font-medium">Colaborador: {order.collaboratorId}</span>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Itens do Pedido</h4>
                            <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs font-bold rounded-full">
                                {order.orderItems.length} {order.orderItems.length === 1 ? 'item' : 'itens'}
                            </span>
                        </div>

                        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                            <div className="grid grid-cols-12 gap-2 mb-2 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 border-b pb-1">
                                <div className="col-span-1 text-center">#</div>
                                <div className="col-span-6">Produto</div>
                                <div className="col-span-2 text-center">Qtd</div>
                                <div className="col-span-3 text-right">Valor</div>
                            </div>
                            
                            {order.orderItems.map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className="grid grid-cols-12 gap-2 items-center p-2 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800 rounded-lg border border-amber-100 dark:border-gray-600 hover:bg-amber-100 dark:hover:bg-gray-600 transition-colors"
                                >
                                    {/* Número do item */}
                                    <div className="col-span-1 flex justify-center">
                                        <div className="w-7 h-7 flex items-center justify-center bg-amber-500 text-white rounded-full font-bold text-sm">
                                            {idx + 1}
                                        </div>
                                    </div>
                                    
                                    {/* Nome do produto */}
                                    <div className="col-span-6">
                                        <p className="font-medium text-gray-800 dark:text-gray-200 truncate">
                                            {item.productName}
                                        </p>
                                    </div>
                                    
                                    {/* Quantidade */}
                                    <div className="col-span-2">
                                        <div className="flex justify-center">
                                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-bold">
                                                {item.quantity || 1}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Valor */}
                                    <div className="col-span-3">
                                        <div className="text-right">
                                            <p className="font-bold text-green-600 dark:text-green-400">
                                                R$ {(item.price || 0).toFixed(2)}
                                            </p>
                                            {item.quantity && item.price && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Total: R$ {(item.quantity * item.price).toFixed(2)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rodapé */}
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Subtotal */}
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Subtotal</p>
                                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                    R$ {order.orderItems.reduce((sum, item) => 
                                        sum + ((item.price || 0) * (item.quantity || 1)), 0).toFixed(2)}
                                </p>
                            </div>
                            
                            {/* Total geral */}
                            <div className="text-right">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total do Pedido</p>
                                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                    R$ {order.orderItems.reduce((sum, item) => 
                                        sum + ((item.price || 0) * (item.quantity || 1)), 0).toFixed(2)}
                                </p>
                            </div>
                        </div>
                       </div>
                </div>
            ))}
        </div>
    );
}