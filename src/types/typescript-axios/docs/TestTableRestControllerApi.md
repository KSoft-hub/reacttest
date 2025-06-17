# TestTableRestControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**add**](#add) | **POST** /api/testTables | |
|[**getTestTable**](#gettesttable) | **GET** /api/testTables/{id} | |
|[**getTestTables**](#gettesttables) | **GET** /api/testTables | |

# **add**
> TestTable add(testTableRequest)


### Example

```typescript
import {
    TestTableRestControllerApi,
    Configuration,
    TestTableRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TestTableRestControllerApi(configuration);

let testTableRequest: TestTableRequest; //

const { status, data } = await apiInstance.add(
    testTableRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **testTableRequest** | **TestTableRequest**|  | |


### Return type

**TestTable**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getTestTable**
> TestTable getTestTable()


### Example

```typescript
import {
    TestTableRestControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TestTableRestControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getTestTable(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**TestTable**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getTestTables**
> Array<TestTable> getTestTables()


### Example

```typescript
import {
    TestTableRestControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TestTableRestControllerApi(configuration);

const { status, data } = await apiInstance.getTestTables();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<TestTable>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

