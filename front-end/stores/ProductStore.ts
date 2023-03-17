import { defineStore } from 'pinia';
import api from '~/services/api'
import { Product, ProductEdit, StockProduct} from '~~/models/Products';

export const useProductStore = defineStore('product', () => {
    const entity = reactive(new Product());
    const entities = ref(new Array<Product>());
    const productPath = entity.path;
    
    const stock = ref(new Array<StockProduct>());
    const stockPath = new StockProduct().path;
    
    const errors = ref("");

    const getAll = async () => {
        const response = await api.get(productPath);
        entities.value = response.data;
    }

    const getAllStock = async () => {
        const response = await api.get(stockPath);
        entities.value = response.data;
    }

    const getById = async (id:any) => {
        const response = await api.get(productPath + id );
        Object.assign(entity,response.data);
    }

    const getByBarcode = async () => {
        const response = await api.get(productPath + "barcode/" + entity.barcode );
        Object.assign(entity,{
            name: response.data.name,
            cost: response.data.cost
        });
        return response;
    }

    const saveAllInStock = async (data:any) => {
        await api.post(stockPath, data);
    }

    const destroy = async (id:any) => {
        const response = await api.delete(productPath + id);
    }

    const resetEntity = () => Object.assign(entity,new Product());

    const getSubSet = (object:any, types:any) => {
        return types.reduce((obj:any, type:any) => {
            return {
            ...obj,
            [type]: object[type]
            }
        }, {});
    }

    const save = async (data:any) => {
        await api.post(productPath, data);
    }

    const update = async (data:any, id:any) => {
        let object = getSubSet(data, Object.getOwnPropertyNames(new ProductEdit()));
        await api.put(productPath + id, object);
    }
  
    return { entity, entities, errors, getAll, getById, destroy, resetEntity, save, update, getAllStock, getByBarcode, stock, saveAllInStock };
  })
  