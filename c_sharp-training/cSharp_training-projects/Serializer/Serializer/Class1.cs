using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Serializer
{
    public class objectSerializer
    {
        public static string serializeObject(object obj)
        {
            if (obj == null)
            {
                return "null";
            }

            Type objType = obj.GetType();
            PropertyInfo[] properties = objType.GetProperties();

            string result = $"Object of type {objType.Name}:\n";
            foreach (var pro in properties)
            {
                string propName = pro.Name;
                object propValue = pro.GetValue(obj);

                result += $"{propName} : {propValue}\n";

            }
            return result;
        }
    }
}
