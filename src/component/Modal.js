// Modal.js
import React from 'react';

const Modal = ({ isOpen, closeModal, content }) => {
    return (
        isOpen && (
        <div className="modal">
            <div className="modal-content">
                <div className="mb-2 grid grid-rows-2 grid-flow-col gap-4">
                    <div className="row-span-2 pt-4"> 
                        <h1 className="text-3xl pl-5 mb-3 font-light"> Edit Amount : Items in warehouse <span className='pl-2 mr-2 rounded-lg border-2 border-gray-300'> {content.frequency_api} </span> items </h1> 
                    </div>
                    <div className="row-span-2"><span className="text-5xl close text-right pr-4" onClick={closeModal}>&times;</span></div>
                </div>
                
                <div class="border-t-2 border-b-2 p-5 mb-4">
                    <div className="grid grid-rows-2 grid-flow-col gap-4">
                        <div className="row-span-1 col-span-2"></div>
                        <div className="row-span-1 col-span-2"></div>
                        <div className="row-span-1 col-span-1"></div>
                        <div className="row-span-1 col-span-1"></div>
                        <div className="text-1xl row-span-1 col-span-2 font-normal">Product No : {content.monitor_id}</div>
                        <div className="row-span-1 col-span-2">
                            <label style={{ fontSize: '16px', fontWeight: 'normal' }}>
                                <input type="radio" name="operation" value="inbound" /> In bound
                            </label>
                        </div>
                        <div className="text-1xl row-span-1 col-span-1 font-normal">Product Name : {content.monitor_name}</div>
                        <div className="row-span-1 col-span-1">
                            <label style={{ fontSize: '16px', fontWeight: 'normal' }}>
                                <input type="radio" name="operation" value="outbound"/> Out bound
                            </label>
                        </div>
                        <div className="row-span-1 col-span-2"></div>
                        <div className="row-span-1 col-span-2"></div>
                    </div>
                </div>
                
                <div class="pl-3 pr-3 pt-4">
                    <div className='rounded-lg border-2 border-stone-400 pl-3 pr-2'>
                        <button className='text-base mr-3 font-light'>Lot in Stock</button>
                        <button className='text-base mr-3 font-light'>Lot History</button>
                        <div className="grid grid-rows-2 grid-flow-col gap-4"></div>
                        <hr className='mb-4'/>
                        <p className='mb-3 font-light'>Lot in Stock</p>
                        <div className="grid grid-rows-1 grid-flow-col gap-4 mb-2">
                            <div className="text-start row-span-1 col-span-1 text-base font-light">
                                <label for="number" class="mr-2">Show entries </label>
                                <select id="number" class="pl-3 p-1 text-sm border rounded">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                <option value="10">10</option>
                                </select>
                            </div>
                            <div className="text-end row-span-1 col-span-1">
                                <input type="text" id="search" placeholder='search' class="pl-3 p-1 text-sm border rounded"/>
                            </div>
                        </div>
                        <table class="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th class="py-2 px-4 border-b">Lot No</th>
                                    <th class="py-2 px-4 border-b">Amount</th>
                                    <th class="py-2 px-4 border-b">Expired Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="py-2 px-4 border-b text-center">12345</td>
                                    <td class="py-2 px-4 border-b text-center">$100.00</td>
                                    <td class="py-2 px-4 border-b text-center">2023-12-31</td>
                                </tr>
                                <tr>
                                    <td class="py-2 px-4 border-b text-center">12345</td>
                                    <td class="py-2 px-4 border-b text-center">$100.00</td>
                                    <td class="py-2 px-4 border-b text-center">2023-12-31</td>
                                </tr>
                                <tr>
                                    <td class="py-2 px-4 border-b text-center">12345</td>
                                    <td class="py-2 px-4 border-b text-center">$100.00</td>
                                    <td class="py-2 px-4 border-b text-center">2023-12-31</td>
                                </tr>
                                <tr>
                                    <td class="py-2 px-4 border-b text-center">12345</td>
                                    <td class="py-2 px-4 border-b text-center">$100.00</td>
                                    <td class="py-2 px-4 border-b text-center">2023-12-31</td>
                                </tr>
                                <tr>
                                    <td class="py-2 px-4 border-b text-center">12345</td>
                                    <td class="py-2 px-4 border-b text-center">$100.00</td>
                                    <td class="py-2 px-4 border-b text-center">2023-12-31</td>
                                </tr>
                                <tr>
                                    <td class="py-2 px-4 border-b text-center">12345</td>
                                    <td class="py-2 px-4 border-b text-center">$100.00</td>
                                    <td class="py-2 px-4 border-b text-center">2023-12-31</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th class="py-2 px-4 border-b">Lot No</th>
                                    <th class="py-2 px-4 border-b">Amount</th>
                                    <th class="py-2 px-4 border-b">Expired Date</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        )
    );
};

export default Modal;
